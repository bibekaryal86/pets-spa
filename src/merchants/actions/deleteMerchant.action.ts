import React from 'react';

import { GlobalDispatch } from '../../app/store/redux';
import { MSG_KEY_DELETE_MERCHANT_FAIL, MSG_KEY_EDIT_MERCHANT_SUCCESS } from '../../common/utils/constants';
import { FetchOptions } from '../../common/utils/fetch';
import { prefetch } from '../../common/utils/prefetch';
import { getEndpoint } from '../../home/utils/endpoint';
import {
  MERCHANTS_COMPLETE,
  MERCHANTS_DELETE_FAILURE,
  MERCHANTS_DELETE_REQUEST,
  MERCHANTS_DELETE_SUCCESS,
} from '../types/merchants.action.types';
import { MerchantsResponse } from '../types/merchants.data.types';

export const deleteMerchant = (username: string, id: string) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch(deleteMerchantRequest());

    try {
      const urlPath = getEndpoint([process.env.BASE_URL as string, process.env.EDIT_MERCHANT_ENDPOINT as string]);
      const options: Partial<FetchOptions> = {
        method: 'DELETE',
        pathParams: { username },
        queryParams: { id },
      };
      const deleteMerchantResponse = (await prefetch(urlPath, options)) as MerchantsResponse;

      if (deleteMerchantResponse && !deleteMerchantResponse.status) {
        dispatch(deleteMerchantSuccess());
      } else {
        dispatch(deleteMerchantFailure(deleteMerchantResponse?.status?.errMsg));
      }
    } catch (error) {
      console.log('Delete Merchant Error: ', error);
      dispatch(deleteMerchantFailure(''));
    } finally {
      dispatch(deleteMerchantComplete());
    }
  };
};

const deleteMerchantRequest = () => ({
  type: MERCHANTS_DELETE_REQUEST,
});

const deleteMerchantSuccess = () => ({
  type: MERCHANTS_DELETE_SUCCESS,
  success: MSG_KEY_EDIT_MERCHANT_SUCCESS,
});

const deleteMerchantFailure = (errMsg: string) => ({
  type: MERCHANTS_DELETE_FAILURE,
  error: errMsg || MSG_KEY_DELETE_MERCHANT_FAIL,
});

const deleteMerchantComplete = () => ({
  type: MERCHANTS_COMPLETE,
});
