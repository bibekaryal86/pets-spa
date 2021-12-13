import { GlobalDispatch } from '../../app/store/redux';
import { MSG_KEY_FAIL_SIGNIN } from '../../common/utils/constants';
import { FetchOptions, FetchResponse } from '../../common/utils/fetch';
import { LocalStorage } from '../../common/utils/localStorageHelper';
import { prefetch } from '../../common/utils/prefetch';
import {
  USER_LOGIN_COMPLETE,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from '../types/home.action.types';
import { DefaultLoginResponse, LoginResponse } from '../types/home.data.types';
import { getEndpoint } from '../utils/endpoint';

export const userLogin = (username: string, password: string) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch(userLoginRequest());

    try {
      const loginEndpoint = getEndpoint([
        process.env.BASE_URL as string,
        process.env.LOGIN_ENDPOINT as string,
      ]);
      const options: Partial<FetchOptions> = {
        method: 'POST',
        noAuth: true,
        requestBody: {
          username,
          password,
        },
      };

      const fetchResponse = (await prefetch(
        loginEndpoint,
        options,
        true,
      )) as FetchResponse;

      if (fetchResponse.statusCode === 200) {
        const loginResponse = fetchResponse.data as LoginResponse;
        userLoginSuccess(dispatch, loginResponse);
      } else {
        dispatch(userLoginFail());
      }
    } catch (error) {
      console.log('Login Action Error: ', error);
      dispatch(userLoginFail());
    } finally {
      dispatch(userLoginComplete());
    }
  };
};

const userLoginRequest = () => ({
  type: USER_LOGIN_REQUEST,
  error: '',
  loginResponse: DefaultLoginResponse,
});

const userLoginSuccess = (
  dispatch: React.Dispatch<GlobalDispatch>,
  loginResponse: LoginResponse,
) => {
  dispatch(userLoginSuccessResponseActions(loginResponse));
  userLoginSuccessLocalStorageActions(loginResponse);
};

const userLoginSuccessResponseActions = (loginResponse: LoginResponse) => ({
  type: USER_LOGIN_SUCCESS,
  error: '',
  loginResponse,
});

const userLoginSuccessLocalStorageActions = (loginResponse: LoginResponse) => {
  LocalStorage.setItem('token', loginResponse.token);
  LocalStorage.setItem('userDetails', loginResponse.userDetails);
};

const userLoginFail = () => ({
  type: USER_LOGIN_FAILURE,
  error: MSG_KEY_FAIL_SIGNIN,
  loginResponse: DefaultLoginResponse,
});

const userLoginComplete = () => ({
  type: USER_LOGIN_COMPLETE,
});
