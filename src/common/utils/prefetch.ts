import store from '../../app/store/redux';
import { PREFETCH_DISPATCH_ACTION } from '../types/common.action.types';
import { Async, FetchOptions, FetchResponse } from './fetch';

export interface PrefetchState {
  isSessionInvalid: boolean;
  isRefreshTokenRequired: boolean;
}

export interface PrefetchAction {
  type: string;
  prefetch: PrefetchState;
}

const SessionInvalid: PrefetchState = {
  isSessionInvalid: true,
  isRefreshTokenRequired: false,
};

const RefreshTokenRequired: PrefetchState = {
  isSessionInvalid: false,
  isRefreshTokenRequired: true,
};

const dispatchActions = (fetchResponse: Promise<FetchResponse>): void => {
  const statusCodePromise = fetchResponse.then((value) => value.statusCode);
  statusCodePromise.then((value) => {
    if (value === 401 || value === 403) {
      console.log('Dispatching Invalid Status Code for Logging Out');
      store.dispatch({
        type: PREFETCH_DISPATCH_ACTION,
        prefetch: SessionInvalid,
      });
    } else {
      const refreshTokenPromise = fetchResponse.then(
        (value) => value.refreshToken,
      );
      refreshTokenPromise.then((value) => {
        if (value === true) {
          console.log('Dispatching Request to Refresh Tokens');
          store.dispatch({
            type: PREFETCH_DISPATCH_ACTION,
            prefetch: RefreshTokenRequired,
          });
        }
      });
    }
  });
};

export const prefetch = (
  urlPath: string,
  options: Partial<FetchOptions>,
  isLoginAction?: boolean,
): unknown => {
  const fetchResponse: Promise<FetchResponse> = Async.fetch(urlPath, options);

  if (isLoginAction) {
    return fetchResponse;
  }

  dispatchActions(fetchResponse);
  return fetchResponse.then((value) => value.data);
};
