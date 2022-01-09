import React from 'react';
import { GlobalDispatch, GlobalState } from '../../app/store/redux';
import { MSG_KEY_GET_ACCOUNT_FAIL } from '../../common/utils/constants';
import { FetchOptions } from '../../common/utils/fetch';
import { prefetch } from '../../common/utils/prefetch';
import { getEndpoint } from '../../home/utils/endpoint';
import {
  ACCOUNTS_COMPLETE,
  ACCOUNTS_GET_FAILURE,
  ACCOUNTS_GET_REQUEST,
  ACCOUNTS_GET_SUCCESS,
  ACCOUNTS_SELECT_ACCOUNT,
} from '../types/accounts.action.types';
import {
  Account,
  AccountFilters,
  AccountsAction,
  AccountsResponse,
  DefaultAccount,
  DefaultAccountsState,
} from '../types/accounts.data.types';

export const getAccounts = (
  username: string,
  selectedAccountId?: string,
  accountFilters?: AccountFilters,
  fetchCallOnly?: boolean,
) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>, getStore: () => GlobalState): Promise<void> => {
    dispatch(getAccountsRequest());

    try {
      let getAccountsResponse: Partial<AccountsResponse>;
      const accountsInStore: Account[] = getStore().accounts.accountsList;

      if (accountsInStore.length === 0 || fetchCallOnly) {
        const urlPath = getEndpoint([process.env.BASE_URL as string, process.env.GET_ACCOUNTS_ENDPOINT as string]);
        const options: Partial<FetchOptions> = {
          method: 'POST',
          pathParams: { username },
          requestBody: accountFilters || null,
        };
        getAccountsResponse = (await prefetch(urlPath, options)) as AccountsResponse;
      } else if (accountsInStore.length > 0) {
        getAccountsResponse = {
          accounts: accountsInStore,
        };
      } else {
        getAccountsResponse = {
          deleteCount: 0,
          status: {
            errMsg: 'Something Went Wrong! Bad Logic!! Please Try Again!!!',
          },
          accounts: [],
        };
      }

      if (getAccountsResponse && getAccountsResponse.accounts && !getAccountsResponse.status) {
        if (selectedAccountId) {
          setSelectedAccount(selectedAccountId, getAccountsResponse.accounts, dispatch);
        }

        dispatch(getAccountsSuccess(getAccountsResponse.accounts));
      } else {
        dispatch(getAccountsFailure(getAccountsResponse?.status?.errMsg));
      }
    } catch (error) {
      console.log('Get Accounts Error: ', error);
      dispatch(getAccountsFailure(''));
    } finally {
      dispatch(getAccountsComplete());
    }
  };
};

const getAccountsRequest = () => ({
  type: ACCOUNTS_GET_REQUEST,
});

const getAccountsSuccess = (accountsList: Account[]) => ({
  type: ACCOUNTS_GET_SUCCESS,
  accountsList,
});

const getAccountsFailure = (errMsg: string | undefined) => ({
  type: ACCOUNTS_GET_FAILURE,
  error: errMsg || MSG_KEY_GET_ACCOUNT_FAIL,
});

const getAccountsComplete = () => ({
  type: ACCOUNTS_COMPLETE,
});

const setSelectedAccount = (
  selectedAccountId: string,
  accountsList: Account[],
  dispatch: React.Dispatch<AccountsAction>,
) => {
  const selectedAccount =
    accountsList.find((account) => {
      return account.id === selectedAccountId;
    }) || DefaultAccount;

  dispatch({
    ...DefaultAccountsState,
    type: ACCOUNTS_SELECT_ACCOUNT,
    selectedAccount,
  });
};
