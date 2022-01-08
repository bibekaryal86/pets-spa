import React from 'react';
import { GlobalDispatch } from '../../app/store/redux';
import { MSG_KEY_DELETE_ACCOUNT_FAIL, MSG_KEY_EDIT_ACCOUNT_SUCCESS } from '../../common/utils/constants';
import { FetchOptions } from '../../common/utils/fetch';
import { prefetch } from '../../common/utils/prefetch';
import { getEndpoint } from '../../home/utils/endpoint';
import {
  ACCOUNTS_COMPLETE,
  ACCOUNTS_DELETE_FAILURE,
  ACCOUNTS_DELETE_REQUEST,
  ACCOUNTS_DELETE_SUCCESS,
} from '../types/accounts.action.types';
import { AccountsResponse } from '../types/accounts.data.types';

export const deleteAccount = (username: string, id: string) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch(deleteAccountRequest());

    try {
      const urlPath = getEndpoint([process.env.BASE_URL as string, process.env.EDIT_ACCOUNT_ENDPOINT as string]);
      const options: Partial<FetchOptions> = {
        method: 'DELETE',
        pathParams: { username },
        queryParams: { id },
      };
      const deleteAccountResponse = (await prefetch(urlPath, options)) as AccountsResponse;

      if (deleteAccountResponse && !deleteAccountResponse.status) {
        dispatch(deleteAccountSuccess());
      } else {
        dispatch(deleteAccountFailure(deleteAccountResponse?.status?.errMsg));
      }
    } catch (error) {
      console.log('Delete Account Error: ', error);
      dispatch(deleteAccountFailure(''));
    } finally {
      dispatch(deleteAccountComplete());
    }
  };
};

const deleteAccountRequest = () => ({
  type: ACCOUNTS_DELETE_REQUEST,
});

const deleteAccountSuccess = () => ({
  type: ACCOUNTS_DELETE_SUCCESS,
  success: MSG_KEY_EDIT_ACCOUNT_SUCCESS,
});

const deleteAccountFailure = (errMsg: string) => ({
  type: ACCOUNTS_DELETE_FAILURE,
  error: errMsg || MSG_KEY_DELETE_ACCOUNT_FAIL,
});

const deleteAccountComplete = () => ({
  type: ACCOUNTS_COMPLETE,
});
