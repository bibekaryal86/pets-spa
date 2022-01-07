import React from 'react';
import { GlobalDispatch } from '../../app/store/redux';
import { FetchOptions, FetchResponse } from '../../common/utils/fetch';
import { LocalStorage } from '../../common/utils/localStorageHelper';
import { prefetch } from '../../common/utils/prefetch';
import { SessionStorage } from '../../common/utils/sessionStorageHelper';
import { USER_LOGIN_SUCCESS, USER_LOGOUT } from '../types/home.action.types';
import { LoginResponse, UserDetails } from '../types/home.data.types';
import { getEndpoint } from '../utils/endpoint';

export const userLogout = (
  token: string,
  userDetails?: UserDetails,
  isRefreshTokenRequired?: boolean,
) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    if (isRefreshTokenRequired) {
      try {
        if (!token) {
          token = LocalStorage.getItem('token') as string;
        }

        const logoutEndpoint = getEndpoint([
          process.env.BASE_URL as string,
          process.env.REFRESH_TOKEN_ENDPOINT as string,
        ]);

        const options: Partial<FetchOptions> = {
          method: 'POST',
          noAuth: true,
          requestBody: {
            token,
            logOut: !isRefreshTokenRequired,
          },
        };

        const fetchResponse = (await prefetch(
          logoutEndpoint,
          options,
          true,
        )) as FetchResponse;

        if (!userDetails) {
          userDetails = LocalStorage.getItem('userDetails') as UserDetails;
        }

        if (fetchResponse.statusCode === 200) {
          const loginResponse = fetchResponse.data as LoginResponse;
          if (userDetails)
            userRefreshSuccess(dispatch, loginResponse, userDetails);
        } else {
          clearLocalData(dispatch);
        }
      } catch (error) {
        console.log('Logout Action Refresh Token Error: ', error);
        clearLocalData(dispatch);
      }
    } else {
      clearLocalData(dispatch);
    }
  };
};

const clearLocalData = (dispatch: React.Dispatch<GlobalDispatch>) => {
  LocalStorage.removeAllItems();
  SessionStorage.removeAllItems();
  dispatch({
    type: USER_LOGOUT,
  });
};

const userRefreshSuccess = (
  dispatch: React.Dispatch<GlobalDispatch>,
  loginResponse: LoginResponse,
  userDetails: UserDetails,
) => {
  const newLoginResponse: LoginResponse = {
    statusCode: 0,
    token: loginResponse.token,
    userDetails,
  };
  dispatch(userLoginSuccessResponseActions(newLoginResponse));
  userRefreshSuccessLocalStorageActions(loginResponse);
};

const userLoginSuccessResponseActions = (loginResponse: LoginResponse) => ({
  type: USER_LOGIN_SUCCESS,
  error: '',
  loginResponse,
});

const userRefreshSuccessLocalStorageActions = (
  loginResponse: LoginResponse,
) => {
  LocalStorage.setItem('token', loginResponse.token);
};
