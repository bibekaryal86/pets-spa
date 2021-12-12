import {useContext, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {AuthContext} from '../../app/context/AuthContext';
import {DefaultUserDetails} from '../types/home.data.types';

interface SignOutProps {
    userLogout: (token: string) => void;
}

const SignOut = (props: SignOutProps): React.ReactElement => {
    // also update context when sign out
    const authContext = useContext(AuthContext);

    useEffect(() => {
        props.userLogout(authContext.auth?.token);

        const auth = {
            isLoggedIn: false,
            token: '',
            userDetails: DefaultUserDetails,
        };

        authContext.login(auth);
    }, [authContext, props]);

    return <Redirect to="/"/>;
};

export default SignOut;
