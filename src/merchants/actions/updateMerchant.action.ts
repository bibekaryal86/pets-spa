import React from 'react';

import { GlobalDispatch } from '../../app/store/redux';
import {
  MSG_KEY_EDIT_MERCHANT_FAIL,
  MSG_KEY_EDIT_MERCHANT_SUCCESS,
  MSG_KEY_INVALID_MERCHANT,
} from '../../common/utils/constants';
import { FetchOptions } from '../../common/utils/fetch';
import { prefetch } from '../../common/utils/prefetch';
import { getEndpoint } from '../../home/utils/endpoint';
import {
  MERCHANTS_COMPLETE,
  MERCHANTS_EDIT_FAILURE,
  MERCHANTS_EDIT_REQUEST,
  MERCHANTS_EDIT_SUCCESS,
} from '../types/merchants.action.types';
import { MerchantsRequest, MerchantsResponse } from '../types/merchants.data.types';

const validateMerchant = (newDescription: string): boolean => !!(newDescription && newDescription.trim().length > 2);

export const updateMerchant = (username: string, id: string, newDescription: string) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch(updateMerchantRequest());

    try {
      if (validateMerchant(newDescription)) {
        const urlPath = getEndpoint([process.env.BASE_URL as string, process.env.EDIT_MERCHANT_ENDPOINT as string]);
        const requestBody: MerchantsRequest = {
          username,
          description: newDescription.toUpperCase(),
        };
        const options: Partial<FetchOptions> = {
          method: 'PUT',
          pathParams: { username },
          queryParams: { id },
          requestBody,
        };
        const updateMerchantResponse = (await prefetch(urlPath, options)) as MerchantsResponse;

        if (updateMerchantResponse && !updateMerchantResponse.status) {
          dispatch(updateMerchantSuccess());
        } else {
          dispatch(updateMerchantFailure(updateMerchantResponse?.status?.errMsg));
        }
      } else {
        dispatch(updateMerchantFailure(MSG_KEY_INVALID_MERCHANT));
      }
    } catch (error) {
      console.log('Update Merchant Error: ', error);
      dispatch(updateMerchantFailure(''));
    } finally {
      dispatch(updateMerchantComplete());
    }
  };
};

const updateMerchantRequest = () => ({
  type: MERCHANTS_EDIT_REQUEST,
});

const updateMerchantSuccess = () => ({
  type: MERCHANTS_EDIT_SUCCESS,
  success: MSG_KEY_EDIT_MERCHANT_SUCCESS,
});

const updateMerchantFailure = (errMsg: string) => ({
  type: MERCHANTS_EDIT_FAILURE,
  error: errMsg || MSG_KEY_EDIT_MERCHANT_FAIL,
});

const updateMerchantComplete = () => ({
  type: MERCHANTS_COMPLETE,
});
