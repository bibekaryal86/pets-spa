import React from 'react';
import { ACCOUNTS_SELECT_ACCOUNT_TRANSACTIONS } from '../../accounts/types/accounts.action.types';
import { AccountsAction, DefaultAccountsState } from '../../accounts/types/accounts.data.types';
import { GlobalDispatch, GlobalState } from '../../app/store/redux';
import { MSG_KEY_GET_TRANSACTION_FAIL } from '../../common/utils/constants';
import { FetchOptions } from '../../common/utils/fetch';
import { prefetch } from '../../common/utils/prefetch';
import { getEndpoint } from '../../home/utils/endpoint';
import { MERCHANTS_SELECT_MERCHANT_TRANSACTIONS } from '../../merchants/types/merchants.action.types';
import { DefaultMerchantsState, MerchantsAction } from '../../merchants/types/merchants.data.types';
import {
  TRANSACTIONS_COMPLETE,
  TRANSACTIONS_GET_FAILURE,
  TRANSACTIONS_GET_REQUEST,
  TRANSACTIONS_GET_SUCCESS,
  TRANSACTIONS_SELECT_TRANSACTION,
} from '../types/transactions.action.types';
import {
  DefaultTransaction,
  DefaultTransactionsState,
  Transaction,
  TransactionFilters,
  TransactionsAction,
  TransactionsResponse,
} from '../types/transactions.data.types';

export const getTransactions = (
  username: string,
  transactionsFilters?: Partial<TransactionFilters>,
  selectedTransactionId?: string,
  fetchTransactionsFilters?: TransactionFilters,
  fetchCallOnly?: boolean,
) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>, getStore: () => GlobalState): Promise<void> => {
    dispatch(getTransactionsRequest());

    try {
      let getTransactionsResponse: Partial<TransactionsResponse>;
      const transactionsInStore: Transaction[] = getStore().transactions.transactionsList;

      if (transactionsInStore.length === 0 || fetchCallOnly) {
        const urlPath = getEndpoint([process.env.BASE_URL as string, process.env.GET_TRANSACTIONS_ENDPOINT as string]);
        const options: Partial<FetchOptions> = {
          method: 'POST',
          pathParams: { username },
          requestBody: fetchTransactionsFilters || null,
        };

        getTransactionsResponse = (await prefetch(urlPath, options)) as TransactionsResponse;
      } else if (transactionsInStore.length > 0) {
        getTransactionsResponse = {
          transactions: transactionsInStore,
        };
      } else {
        getTransactionsResponse = {
          deleteCount: 0,
          status: {
            errMsg: 'Something Went Wrong! Bad Logic!! Please Try Again!!!',
          },
          transactions: [],
        };
      }

      if (getTransactionsResponse && getTransactionsResponse.transactions && !getTransactionsResponse.status) {
        if (transactionsFilters) {
          applyTransactionsFilters(getTransactionsResponse.transactions, transactionsFilters, dispatch);
        }

        if (selectedTransactionId) {
          setSelectedTransaction(selectedTransactionId, getTransactionsResponse.transactions, dispatch);
        }

        dispatch(getTransactionsSuccess(getTransactionsResponse.transactions));
      } else {
        dispatch(getTransactionsFailure(getTransactionsResponse?.status?.errMsg));
      }
    } catch (error) {
      console.log('Get Transactions Error: ', error);
      dispatch(getTransactionsFailure(''));
    } finally {
      dispatch(getTransactionsComplete());
    }
  };
};

const getTransactionsRequest = () => ({
  type: TRANSACTIONS_GET_REQUEST,
});

const getTransactionsSuccess = (transactionsList: Transaction[]) => ({
  type: TRANSACTIONS_GET_SUCCESS,
  transactionsList,
});

const getTransactionsFailure = (errMsg: string | undefined) => ({
  type: TRANSACTIONS_GET_FAILURE,
  error: errMsg || MSG_KEY_GET_TRANSACTION_FAIL,
});

const getTransactionsComplete = () => ({
  type: TRANSACTIONS_COMPLETE,
});

const applyTransactionsFilters = (
  transactions: Transaction[],
  transactionFilters: Partial<TransactionFilters>,
  dispatch: React.Dispatch<GlobalDispatch>,
) => {
  if (transactionFilters.accountId) {
    const accountTransactions = transactions.filter((transaction) => {
      return transaction.account.id === transactionFilters.accountId;
    });

    const trfAccountTransactions = transactions.filter((transaction) => {
      return transaction.trfAccount?.id === transactionFilters.accountId;
    });

    const selectedAccountTransactions = [...accountTransactions, ...trfAccountTransactions];

    if (trfAccountTransactions) {
      // ascending
      //selectedAccountTransactions.sort((a, b) => (a.date > b.date ? 1 : -1));
      // descending
      selectedAccountTransactions.sort((a, b) => (a.date > b.date ? -1 : 1));
    }

    setSelectedAccountTransactions(selectedAccountTransactions, dispatch);
  }

  if (transactionFilters.merchantId) {
    const selectedMerchantTransactions = transactions.filter((transaction) => {
      return transaction.refMerchant.id === transactionFilters.merchantId;
    });

    setSelectedMerchantTransactions(selectedMerchantTransactions, dispatch);
  }
};

const setSelectedAccountTransactions = (
  selectedAccountTransactions: Transaction[],
  dispatch: React.Dispatch<AccountsAction>,
) =>
  dispatch({
    ...DefaultAccountsState,
    type: ACCOUNTS_SELECT_ACCOUNT_TRANSACTIONS,
    selectedAccountTransactions,
  });

const setSelectedMerchantTransactions = (
  selectedMerchantTransactions: Transaction[],
  dispatch: React.Dispatch<MerchantsAction>,
) =>
  dispatch({
    ...DefaultMerchantsState,
    type: MERCHANTS_SELECT_MERCHANT_TRANSACTIONS,
    selectedMerchantTransactions,
  });

const setSelectedTransaction = (
  selectedTransactionId: string,
  transactionsList: Transaction[],
  dispatch: React.Dispatch<TransactionsAction>,
) => {
  const selectedTransaction =
    transactionsList.find((transaction) => {
      return transaction.id === selectedTransactionId;
    }) || DefaultTransaction;

  dispatch({
    ...DefaultTransactionsState,
    type: TRANSACTIONS_SELECT_TRANSACTION,
    selectedTransaction,
  });
};
