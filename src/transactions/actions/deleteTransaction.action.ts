import React from 'react';
import { GlobalDispatch } from '../../app/store/redux';
import { MSG_KEY_DELETE_TRANSACTION_FAIL, MSG_KEY_EDIT_TRANSACTION_SUCCESS } from '../../common/utils/constants';
import { FetchOptions } from '../../common/utils/fetch';
import { prefetch } from '../../common/utils/prefetch';
import { getEndpoint } from '../../home/utils/endpoint';
import {
  TRANSACTIONS_COMPLETE,
  TRANSACTIONS_DELETE_FAILURE,
  TRANSACTIONS_DELETE_REQUEST,
  TRANSACTIONS_DELETE_SUCCESS,
} from '../types/transactions.action.types';
import { TransactionsResponse } from '../types/transactions.data.types';

export const deleteTransaction = (username: string, id: string) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch(deleteTransactionRequest());

    try {
      const urlPath = getEndpoint([process.env.BASE_URL as string, process.env.EDIT_TRANSACTION_ENDPOINT as string]);
      const options: Partial<FetchOptions> = {
        method: 'DELETE',
        pathParams: { username },
        queryParams: { id },
      };
      const deleteTransactionResponse = (await prefetch(urlPath, options)) as TransactionsResponse;

      if (deleteTransactionResponse && !deleteTransactionResponse.status) {
        dispatch(deleteTransactionSuccess());
      } else {
        dispatch(deleteTransactionFailure(deleteTransactionResponse?.status?.errMsg));
      }
    } catch (error) {
      console.log('Delete Transaction Error: ', error);
      dispatch(deleteTransactionFailure(''));
    } finally {
      dispatch(deleteTransactionComplete());
    }
  };
};

const deleteTransactionRequest = () => ({
  type: TRANSACTIONS_DELETE_REQUEST,
});

const deleteTransactionSuccess = () => ({
  type: TRANSACTIONS_DELETE_SUCCESS,
  success: MSG_KEY_EDIT_TRANSACTION_SUCCESS,
});

const deleteTransactionFailure = (errMsg: string) => ({
  type: TRANSACTIONS_DELETE_FAILURE,
  error: errMsg || MSG_KEY_DELETE_TRANSACTION_FAIL,
});

const deleteTransactionComplete = () => ({
  type: TRANSACTIONS_COMPLETE,
});
