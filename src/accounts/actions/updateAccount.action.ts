import React from 'react';
import { GlobalDispatch } from '../../app/store/redux';
import {
  MSG_KEY_EDIT_ACCOUNT_FAIL,
  MSG_KEY_EDIT_ACCOUNT_SUCCESS,
} from '../../common/utils/constants';
import { FetchOptions } from '../../common/utils/fetch';
import { prefetch } from '../../common/utils/prefetch';
import { getEndpoint } from '../../home/utils/endpoint';
import { toUppercaseRemoveApostrophe } from '../../transactions/utils/transactions.utils';
import {
  ACCOUNTS_COMPLETE,
  ACCOUNTS_EDIT_FAILURE,
  ACCOUNTS_EDIT_REQUEST,
  ACCOUNTS_EDIT_SUCCESS,
} from '../types/accounts.action.types';
import {
  Account,
  AccountsRequest,
  AccountsResponse,
} from '../types/accounts.data.types';
import { numberFormatter } from '../utils/accounts.utils';

export const updateAccount = (
  username: string,
  id: string,
  account: Account,
  method: string,
) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch(updateAccountRequest());

    try {
      let openingBalance = numberFormatter(+account.openingBalance);
      openingBalance = openingBalance.replace('$', '').replace('-', '');

      const accountRequest: AccountsRequest = {
        typeId: account.refAccountType.id,
        bankId: account.refBank.id,
        description: toUppercaseRemoveApostrophe(account.description),
        openingBalance,
        status: account.status,
        username,
      };
      const urlPath = getEndpoint([
        process.env.BASE_URL as string,
        process.env.EDIT_ACCOUNT_ENDPOINT as string,
      ]);
      const options: Partial<FetchOptions> = {
        method,
        pathParams: { username },
        queryParams: { id },
        requestBody: accountRequest,
      };
      const updateAccountResponse = (await prefetch(
        urlPath,
        options,
      )) as AccountsResponse;

      if (updateAccountResponse && !updateAccountResponse.status) {
        dispatch(updateAccountSuccess());
      } else {
        dispatch(updateAccountFailure(updateAccountResponse?.status?.errMsg));
      }
    } catch (error) {
      console.log('Update Account Error: ', error);
      dispatch(updateAccountFailure(''));
    } finally {
      dispatch(updateAccountComplete());
    }
  };
};

const updateAccountRequest = () => ({
  type: ACCOUNTS_EDIT_REQUEST,
});

const updateAccountSuccess = () => ({
  type: ACCOUNTS_EDIT_SUCCESS,
  success: MSG_KEY_EDIT_ACCOUNT_SUCCESS,
});

const updateAccountFailure = (errMsg: string) => ({
  type: ACCOUNTS_EDIT_FAILURE,
  error: errMsg || MSG_KEY_EDIT_ACCOUNT_FAIL,
});

const updateAccountComplete = () => ({
  type: ACCOUNTS_COMPLETE,
});
