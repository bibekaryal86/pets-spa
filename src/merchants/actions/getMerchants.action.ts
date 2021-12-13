import { GlobalDispatch, GlobalState } from '../../app/store/redux';
import { MSG_KEY_GET_MERCHANT_FAIL } from '../../common/utils/constants';
import { FetchOptions } from '../../common/utils/fetch';
import { prefetch } from '../../common/utils/prefetch';
import { getEndpoint } from '../../home/utils/endpoint';
import {
  MERCHANTS_COMPLETE,
  MERCHANTS_GET_FAILURE,
  MERCHANTS_GET_REQUEST,
  MERCHANTS_GET_SUCCESS,
  MERCHANTS_SELECT_MERCHANT,
} from '../types/merchants.action.types';
import {
  DefaultMerchant,
  DefaultMerchantsState,
  Merchant,
  MerchantFilters,
  MerchantsAction,
  MerchantsResponse,
} from '../types/merchants.data.types';

export const getMerchants = (
  username: string,
  selectedMerchantId?: string,
  merchantFilters?: MerchantFilters,
  fetchCallOnly?: boolean,
) => {
  return async (
    dispatch: React.Dispatch<GlobalDispatch>,
    getStore: () => GlobalState,
  ): Promise<void> => {
    dispatch(getMerchantsRequest());

    try {
      let getMerchantsResponse: Partial<MerchantsResponse>;
      const merchantsInStore: Merchant[] = getStore().merchants.merchantsList;
      const merchantsFiltersListInStore: string[] =
        getStore().merchants.merchantsFiltersList;
      const merchantsNotUsedInTxnsListInStore: Merchant[] =
        getStore().merchants.merchantsNotUsedInTxnsList;

      if (merchantsInStore.length === 0 || fetchCallOnly) {
        const urlPath = getEndpoint([
          process.env.BASE_URL as string,
          process.env.GET_MERCHANTS_ENDPOINT as string,
        ]);
        const options: Partial<FetchOptions> = {
          method: 'POST',
          pathParams: { username },
          requestBody: merchantFilters || null,
        };

        getMerchantsResponse = (await prefetch(
          urlPath,
          options,
        )) as MerchantsResponse;
      } else if (merchantsInStore.length > 0) {
        getMerchantsResponse = {
          refMerchants: merchantsInStore,
          refMerchantsFilterList: merchantsFiltersListInStore,
          refMerchantsNotUsedInTransactions: merchantsNotUsedInTxnsListInStore,
        };
      } else {
        getMerchantsResponse = {
          status: {
            errMsg: 'Something Went Wrong! Bad Logic!! Please Try Again!!!',
          },
          refMerchants: [],
          refMerchantsFilterList: [],
          refMerchantsNotUsedInTransactions: [],
        };
      }

      if (getMerchantsResponse && !getMerchantsResponse.status) {
        if (selectedMerchantId) {
          setSelectedMerchant(
            selectedMerchantId,
            getMerchantsResponse,
            dispatch,
          );
        }

        dispatch(getMerchantsSuccess(getMerchantsResponse));
      } else {
        dispatch(getMerchantsFailure(getMerchantsResponse?.status?.errMsg));
      }
    } catch (error) {
      console.log('Get Merchants Error: ', error);
      dispatch(getMerchantsFailure(''));
    } finally {
      dispatch(getMerchantsComplete());
    }
  };
};

const getMerchantsRequest = () => ({
  type: MERCHANTS_GET_REQUEST,
});

const getMerchantsSuccess = (
  getMerchantsResponse: Partial<MerchantsResponse>,
) => ({
  type: MERCHANTS_GET_SUCCESS,
  merchantsList: getMerchantsResponse.refMerchants,
  merchantsFiltersList: getMerchantsResponse.refMerchantsFilterList,
  merchantsNotUsedInTxnsList:
    getMerchantsResponse.refMerchantsNotUsedInTransactions,
});

const getMerchantsFailure = (errMsg: string | undefined) => ({
  type: MERCHANTS_GET_FAILURE,
  error: errMsg || MSG_KEY_GET_MERCHANT_FAIL,
});

const getMerchantsComplete = () => ({
  type: MERCHANTS_COMPLETE,
});

const setSelectedMerchant = (
  selectedMerchantId: string,
  merchantsResponse: Partial<MerchantsResponse>,
  dispatch: React.Dispatch<MerchantsAction>,
) => {
  const selectedMerchant =
    merchantsResponse.refMerchants?.find((merchant) => {
      return merchant.id === selectedMerchantId;
    }) || DefaultMerchant;

  dispatch({
    ...DefaultMerchantsState,
    type: MERCHANTS_SELECT_MERCHANT,
    selectedMerchant: selectedMerchant,
  });
};
