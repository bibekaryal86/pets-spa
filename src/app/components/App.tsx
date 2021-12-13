import { useCallback, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import AllGlobalStyles from '../../styles/AllGlobalStyles';
import Header from './Header';
import Alert from '../../common/components/Alert';
import Body from './Body';
import Footer from './Footer';
import {
  AuthContext,
  AuthState,
  DefaultAuthState,
} from '../context/AuthContext';
import { UserDetails } from '../../home/types/home.data.types';
import { LocalStorage } from '../../common/utils/localStorageHelper';
import { PrefetchState } from '../../common/utils/prefetch';
import { userLogout } from '../../home/actions/logout.action';
import authReducer from '../reducers/auth.reducer';
import { GlobalState } from '../store/redux';
import Spinner from '../../common/components/Spinner';
import { getRefTypes } from '../../common/actions/refTypes.action';
import { setAlert } from '../../common/utils/alerts';
import {
  ALERT_TYPE_FAILURE,
  ALERT_TYPE_INFO,
  MSG_KEY_SESSION_INVALID,
} from '../../common/utils/constants';

interface AppProps extends PrefetchState {
  appError: string;
  isLoggedInProps: boolean;
  userLogout: (
    token: string,
    userDetails: UserDetails,
    isRefreshTokenRequired: boolean,
  ) => void;
  getRefTypes: (username: string) => void;
  setAlert: (type: string, messageKey: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppRender = ({ components }: any) => {
  return (
    <>
      {components.map((component: React.ReactElement) => (
        <div key={component.key} className="row">
          <div className="twelve columns">{component}</div>
        </div>
      ))}
    </>
  );
};

function App(props: AppProps): React.ReactElement {
  const [auth, setAuth] = useReducer(authReducer, DefaultAuthState);

  // Set Auth Context from Local Storage on Page Reload
  const checkLogin = useCallback((auth: AuthState): AuthState => {
    setAuth({ authState: auth });
    return auth;
  }, []);

  useEffect(() => {
    const token = LocalStorage.getItem('token') as string;
    const userDetails = LocalStorage.getItem('userDetails') as UserDetails;
    const isLoggedIn = !!token;
    const authState = {
      isLoggedIn,
      token,
      userDetails,
    };
    checkLogin(authState);
  }, [checkLogin]);

  // Set Ref Types to Store on Page Reload When User is Authorized
  const { getRefTypes } = props;

  useEffect(() => {
    if (auth && auth.userDetails && auth.userDetails.username) {
      getRefTypes(auth.userDetails.username);
    }
  }, [auth, getRefTypes]);

  // Check Session Invalid or Refresh Token Required
  const { isSessionInvalid, isRefreshTokenRequired, userLogout, setAlert } =
    props;
  const { token, userDetails } = auth;

  useEffect(() => {
    if (userDetails && (isSessionInvalid || isRefreshTokenRequired)) {
      userLogout(token, userDetails, isRefreshTokenRequired);

      if (isSessionInvalid) {
        setAlert(ALERT_TYPE_INFO, MSG_KEY_SESSION_INVALID);
      }
    }
  }, [
    isRefreshTokenRequired,
    isSessionInvalid,
    setAlert,
    token,
    userDetails,
    userLogout,
  ]);

  // Display any error from any fetch calls
  const { appError, isLoggedInProps } = props;
  useEffect(() => {
    if (isLoggedInProps && appError) {
      setAlert(ALERT_TYPE_FAILURE, appError);
    }
  }, [appError, isLoggedInProps, setAlert]);

  const theApp = () => (
    <div>
      <AllGlobalStyles />
      <AuthContext.Provider
        value={{
          auth,
          login: checkLogin,
        }}
      >
        <div className="container">
          <AppRender
            components={[
              <Header key="app-header-key" />,
              <Alert key="app-alert-key" />,
              <Spinner key="app-spinner-key" size="20" />,
              <Body key="app-body-key" isLoggedIn={auth.isLoggedIn} />,
              <Footer key="app-footer-key" />,
            ]}
          />
        </div>
      </AuthContext.Provider>
    </div>
  );

  return (
    <>
      {isSessionInvalid
        ? (window.location.href = '/?isSessionInvalid=true')
        : theApp()}
    </>
  );
}

const mapStateToProps = ({ prefetch, refTypes, login }: GlobalState) => {
  const isLoggedInProps = !!login.loginResponse.token;
  return {
    isSessionInvalid: prefetch.isSessionInvalid,
    isRefreshTokenRequired: prefetch.isRefreshTokenRequired,
    appError: refTypes.error,
    isLoggedInProps: isLoggedInProps,
  };
};

const mapDispatchToProps = {
  userLogout: (
    token: string,
    userDetails: UserDetails,
    isRefreshTokenRequired: boolean,
  ) => userLogout(token, userDetails, isRefreshTokenRequired),
  getRefTypes: (username: string) => getRefTypes(username),
  setAlert: (type: string, messageKey: string) => setAlert(type, messageKey),
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
