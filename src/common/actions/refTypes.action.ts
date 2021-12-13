import { GlobalDispatch } from '../../app/store/redux';
import { getEndpoint } from '../../home/utils/endpoint';
import {
  REF_TYPES_COMPLETE,
  REF_TYPES_FAILURE,
  REF_TYPES_REQUEST,
  REF_TYPES_SUCCESS,
} from '../types/common.action.types';
import {
  RefAccountType,
  RefAccountTypesResponse,
  RefBank,
  RefBanksResponse,
  RefCategoriesResponse,
  RefCategory,
  RefCategoryType,
  RefCategoryTypesResponse,
  RefTransactionType,
  RefTransactionTypesResponse,
  RefTypesState,
} from '../types/refTypes.data.types';
import { FetchOptions } from '../utils/fetch';
import { prefetch } from '../utils/prefetch';

export const getRefTypes = (username: string, types: string[] = []) => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    const isGetAll = types.length === 0;
    dispatch(refTypesRequest());

    let refAccountTypes: RefAccountType[];
    let refBanks: RefBank[];
    let refCategoryTypes: RefCategoryType[];
    let refCategories: RefCategory[];
    let refTransactionTypes: RefTransactionType[];

    try {
      const refAccountTypesResponse = (await getRefAccountTypes(
        username,
        isGetAll || types.includes('ref_account_types'),
      )) as RefAccountTypesResponse;
      refAccountTypes = refAccountTypesResponse.refAccountTypes || [];

      const refBanksResponse = (await getRefBanks(
        username,
        isGetAll || types.includes('ref_banks'),
      )) as RefBanksResponse;
      refBanks = refBanksResponse.refBanks || [];

      const refCategoryTypesResponse = (await getRefCategoryTypes(
        username,
        isGetAll || types.includes('ref_category_types'),
      )) as RefCategoryTypesResponse;
      refCategoryTypes = refCategoryTypesResponse.refCategoryTypes || [];

      const refCategoriesResponse = (await getRefCategories(
        username,
        isGetAll || types.includes('ref_categories'),
      )) as RefCategoriesResponse;
      refCategories = refCategoriesResponse.refCategories || [];

      const refTransactionTypesResponse = (await getRefTransactionTypes(
        username,
        isGetAll || types.includes('ref_transaction_types'),
      )) as RefTransactionTypesResponse;
      refTransactionTypes =
        refTransactionTypesResponse.refTransactionTypes || [];

      const refTypes: RefTypesState = {
        error: '',
        refAccountTypes,
        refBanks,
        refCategoryTypes,
        refCategories,
        refTransactionTypes,
      };

      dispatch(refTypesSuccess(refTypes));
    } catch (error) {
      console.log('Error in Get Ref Types: ', error);
      dispatch(refTypesFailure());
    } finally {
      dispatch(refTypesComplete());
    }
  };
};

const refTypesRequest = () => ({
  type: REF_TYPES_REQUEST,
});

const refTypesSuccess = (refTypes: RefTypesState) => ({
  type: REF_TYPES_SUCCESS,
  refAccountTypes: refTypes.refAccountTypes,
  refBanks: refTypes.refBanks,
  refCategoryTypes: refTypes.refCategoryTypes,
  refCategories: refTypes.refCategories,
  refTransactionTypes: refTypes.refTransactionTypes,
});

const refTypesFailure = () => ({
  type: REF_TYPES_FAILURE,
});

const refTypesComplete = () => ({
  type: REF_TYPES_COMPLETE,
});

async function getRefAccountTypes(
  username: string,
  isGetThisType: boolean,
): Promise<unknown> {
  const urlPath = getEndpoint([
    process.env.BASE_URL as string,
    process.env.REF_ACCOUNT_TYPES_ENDPOINT as string,
  ]);
  const options: Partial<FetchOptions> = { pathParams: { username } };
  return isGetThisType && prefetch(urlPath, options);
}

async function getRefBanks(
  username: string,
  isGetThisType: boolean,
): Promise<unknown> {
  const urlPath = getEndpoint([
    process.env.BASE_URL as string,
    process.env.REF_BANKS_ENDPOINT as string,
  ]);
  const options: Partial<FetchOptions> = { pathParams: { username } };
  return isGetThisType && prefetch(urlPath, options);
}

async function getRefCategoryTypes(
  username: string,
  isGetThisType: boolean,
): Promise<unknown> {
  const urlPath = getEndpoint([
    process.env.BASE_URL as string,
    process.env.REF_CATEGORY_TYPES_ENDPOINT as string,
  ]);
  const options: Partial<FetchOptions> = { pathParams: { username } };
  return isGetThisType && prefetch(urlPath, options);
}

async function getRefCategories(
  username: string,
  isGetThisType: boolean,
): Promise<unknown> {
  const urlPath = getEndpoint([
    process.env.BASE_URL as string,
    process.env.REF_CATEGORIES_ENDPOINT as string,
  ]);
  const options: Partial<FetchOptions> = {
    method: 'POST',
    pathParams: { username },
  };
  return isGetThisType && prefetch(urlPath, options);
}

async function getRefTransactionTypes(
  username: string,
  isGetThisType: boolean,
): Promise<unknown> {
  const urlPath = getEndpoint([
    process.env.BASE_URL as string,
    process.env.REF_TRANSACTION_TYPES_ENDPOINT as string,
  ]);
  const options: Partial<FetchOptions> = { pathParams: { username } };
  return isGetThisType && prefetch(urlPath, options);
}
