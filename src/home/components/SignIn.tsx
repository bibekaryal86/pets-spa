import {useCallback, useContext, useEffect, useState} from 'react';
import Input, {InputType} from '../../common/forms/Input';
import Button from '../../common/forms/Button';
import {validateLogInInput} from '../utils/validate';
import {
  ALERT_TYPE_FAILURE,
  ALERT_TYPE_INFO,
  MSG_KEY_FAIL_SIGNIN,
  MSG_KEY_INVALID_SIGNIN,
  MSG_KEY_SESSION_INVALID,
  MSG_KEY_SIGNIN_FIRST,
} from '../../common/utils/constants';
import {AuthContext} from '../../app/context/AuthContext';
import {useHistory, useLocation} from 'react-router';
import {Redirect} from 'react-router-dom';
import {DisplayCardBody, DisplayCardRow, DisplayCardWrapper,} from '../../styles/styled.card.style';
import {LoginResponse} from '../types/home.data.types';

interface SignInProps {
    error: string;
    loginResponse: LoginResponse;
    userLogin: (username: string, password: string) => void;
    setAlert: (type: string, messageKey: string) => void;
    resetAlert: () => void;
}

const SignIn = (props: SignInProps): React.ReactElement => {
    const {error, loginResponse, userLogin, setAlert, resetAlert} = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectTo, setRedirectTo] = useState('');

    const handleUsernameChange = (newValue: string) => setUsername(newValue);
    const handlePasswordChange = (newValue: string) => setPassword(newValue);

    useEffect(() => {
        error && setAlert(ALERT_TYPE_FAILURE, MSG_KEY_FAIL_SIGNIN);
    }, [error, setAlert]);

    const handleSubmit = useCallback(() => {
        const isInputValid = validateLogInInput(username, password);
        if (isInputValid) {
            userLogin(username, password);
        } else {
            setAlert(ALERT_TYPE_FAILURE, MSG_KEY_INVALID_SIGNIN);
        }
    }, [username, password, userLogin, setAlert]);

    const onSearchEnterCallback = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                handleSubmit();
            }
        },
        [handleSubmit],
    );

    const loginSuccessFul = (loginResponse: LoginResponse) =>
        !!(loginResponse &&
            loginResponse.token &&
            loginResponse.userDetails &&
            loginResponse.userDetails.username);

    //update context when sign in
    const authContext = useContext(AuthContext);
    useEffect(() => {
        if (loginSuccessFul(loginResponse)) {
            const auth = {
                isLoggedIn: true,
                token: loginResponse.token,
                userDetails: loginResponse.userDetails,
            };

            authContext.login(auth);
            resetAlert();
        }
    }, [authContext, loginResponse, resetAlert]);

    const signInForm = () => (
        <DisplayCardWrapper alignContent="center">
            <DisplayCardBody width="20%">
                <DisplayCardRow>
                    <h3>Welcome Back!</h3>
                    <p>Please Sign In</p>
                </DisplayCardRow>
                <DisplayCardRow borderTop borderBtm>
                    <form>
                        <Input
                            id="sign_in_user_name"
                            label="Username"
                            onChange={handleUsernameChange}
                            value={username}
                            placeholder="username..."
                            required
                            autoComplete="username"
                            onKeyPress={onSearchEnterCallback}
                        />
                        <Input
                            id="sign_in_password"
                            label="Password"
                            onChange={handlePasswordChange}
                            value={password}
                            placeholder="password..."
                            type={InputType.password}
                            required
                            autoComplete="current-password"
                            onKeyPress={onSearchEnterCallback}
                        />
                    </form>
                </DisplayCardRow>
                <DisplayCardRow textAlign="center">
                    <Button
                        id={'sign-in-submit'}
                        title="Sign In"
                        onClick={handleSubmit}
                        includeBorder
                        color="green"
                    />
                    <Button
                        id={'sign-in-create'}
                        title="Create Account"
                        onClick={() => alert('TODO: Currently Unavailable')}
                        includeBorder
                        color="orange"
                    />
                </DisplayCardRow>
                <DisplayCardRow borderTop textAlign="center">
                    <Button
                        id={'sign-in-forgot'}
                        title="Forgot Password?"
                        onClick={() => alert('TODO: Currently Unavailable')}
                    />
                </DisplayCardRow>
            </DisplayCardBody>
        </DisplayCardWrapper>
    );

    // redirect to summary or selected page upon successful sign in
    const location = useLocation();
    const locationState = location.state as { redirect: string };
    const redirectToPage = (locationState && locationState.redirect) || '';
    const history = useHistory();

    useEffect(() => {
        if (redirectToPage) {
            setRedirectTo(redirectToPage);
            if (!authContext.auth.isLoggedIn) {
                setAlert(ALERT_TYPE_FAILURE, MSG_KEY_SIGNIN_FIRST);
            }

            history.replace({...history.location, state: {redirect: ''}});
        }
    }, [authContext.auth.isLoggedIn, redirectToPage, setAlert, history]);

    useEffect(() => {
        return () => setRedirectTo('');
    }, []);

    const redirect = useCallback(() => {
        const pageToRedirectTo = redirectToPage || redirectTo;
        if (pageToRedirectTo) {
            return <Redirect to={pageToRedirectTo}/>;
        } else {
            return <Redirect to="/summary"/>;
        }
    }, [redirectTo, redirectToPage]);

    // show session invalidated due to inactivity message
    const search = location.search as string;

    useEffect(() => {
        if (search) {
            const filteredSearch = search.slice(1);
            const arrayedSearch = filteredSearch.split('&');
            const isInvalidSession = arrayedSearch.some(
                (param) => param === 'isSessionInvalid=true',
            );

            if (isInvalidSession) {
                setAlert(ALERT_TYPE_INFO, MSG_KEY_SESSION_INVALID);
            }
        }
    }, [search, setAlert]);

    const checkIsLoggedIn = () =>
        loginSuccessFul(loginResponse) || authContext.auth.isLoggedIn;

    return <>{checkIsLoggedIn() ? redirect() : signInForm()}</>;
};

export default SignIn;
