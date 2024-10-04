import React from 'react';

import { GlobalDispatch } from '../../app/store/redux';
import { MSG_KEY_EDIT_TRANSACTION_FAIL, MSG_KEY_EDIT_TRANSACTION_SUCCESS } from '../../common/utils/constants';
import { FetchOptions } from '../../common/utils/fetch';
import { prefetch } from '../../common/utils/prefetch';
import { getEndpoint } from '../../home/utils/endpoint';
import {
  TRANSACTIONS_COMPLETE,
  TRANSACTIONS_EDIT_FAILURE,
  TRANSACTIONS_EDIT_REQUEST,
  TRANSACTIONS_EDIT_SUCCESS,
} from '../types/transactions.action.types';
import { TransactionsRequest, TransactionsResponse } from '../types/transactions.data.types';

export const updateTransaction = (
  username: string,
  id: string,
  transactionsRequest: TransactionsRequest,
  method: string,
) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch(updateTransactionRequest());

    try {
      const urlPath = getEndpoint([process.env.BASE_URL as string, process.env.EDIT_TRANSACTION_ENDPOINT as string]);
      const options: Partial<FetchOptions> = {
        method,
        pathParams: { username },
        queryParams: { id },
        requestBody: transactionsRequest,
      };

      const updateTransactionResponse = (await prefetch(urlPath, options)) as TransactionsResponse;

      if (updateTransactionResponse && !updateTransactionResponse.status) {
        dispatch(updateTransactionSuccess());
      } else {
        dispatch(updateTransactionFailure(updateTransactionResponse?.status?.errMsg));
      }
    } catch (error) {
      console.log('Update Transaction Error: ', error);
      dispatch(updateTransactionFailure(''));
    } finally {
      dispatch(updateTransactionComplete());
    }
  };
};

const updateTransactionRequest = () => ({
  type: TRANSACTIONS_EDIT_REQUEST,
});

const updateTransactionSuccess = () => ({
  type: TRANSACTIONS_EDIT_SUCCESS,
  success: MSG_KEY_EDIT_TRANSACTION_SUCCESS,
});

const updateTransactionFailure = (errMsg: string) => ({
  type: TRANSACTIONS_EDIT_FAILURE,
  error: errMsg || MSG_KEY_EDIT_TRANSACTION_FAIL,
});

const updateTransactionComplete = () => ({
  type: TRANSACTIONS_COMPLETE,
});
