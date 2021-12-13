import {
  MERCHANTS_CLEAR_FILTER,
  MERCHANTS_DELETE_MODAL_ACTION,
  MERCHANTS_MODAL_CLOSE,
  MERCHANTS_MODAL_INPUT,
  MERCHANTS_SET_MERCHANT_IN_ACTION,
  MERCHANTS_SET_NAME_BEGINS_WITH,
  MERCHANTS_SHOW_NOT_USED_IN_TXNS_ONLY,
  MERCHANTS_UNMOUNT,
  MERCHANTS_UPDATE_MODAL_ACTION,
} from '../types/merchants.action.types';
import { GlobalDispatch } from '../../app/store/redux';
import {
  Merchant,
  MerchantsReducerAction,
} from '../types/merchants.data.types';

export const resetOnPageLeave = () => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch({
      type: MERCHANTS_UNMOUNT,
    });
  };
};

export const setMerchantNameBeginsWithFilter = (
  firstChar: string,
  merchantsList: Merchant[],
): Partial<MerchantsReducerAction> => ({
  type: MERCHANTS_SET_NAME_BEGINS_WITH,
  merchantNameBeginsWith: firstChar,
  displayMerchantsList: filterMerchants(firstChar, merchantsList),
});

export const setMerchantsNotUsedInTxnsOnly = (
  merchantsNotUsedInTxnsList: Merchant[],
): Partial<MerchantsReducerAction> => ({
  type: MERCHANTS_SHOW_NOT_USED_IN_TXNS_ONLY,
  showNotUsedInTxnsOnly: true,
  displayMerchantsList: merchantsNotUsedInTxnsList,
});

export const setMerchantInAction = (
  id: string,
  description: string,
): Partial<MerchantsReducerAction> => ({
  type: MERCHANTS_SET_MERCHANT_IN_ACTION,
  merchantInActionId: id,
  merchantInActionDesc: description,
});

export const clearMerchantsFilter = (): Partial<MerchantsReducerAction> => ({
  type: MERCHANTS_CLEAR_FILTER,
});

export const setIsDeleteModal = (
  isOpen: boolean,
): Partial<MerchantsReducerAction> => ({
  type: MERCHANTS_DELETE_MODAL_ACTION,
  isDeleteModalOpen: isOpen,
});

export const setIsUpdateModal = (
  isOpen: boolean,
): Partial<MerchantsReducerAction> => ({
  type: MERCHANTS_UPDATE_MODAL_ACTION,
  isUpdateModalOpen: isOpen,
});

export const setModalInputs = (
  modalInput: string,
): Partial<MerchantsReducerAction> => ({
  type: MERCHANTS_MODAL_INPUT,
  modalInput,
});

export const closeModals = (): Partial<MerchantsReducerAction> => ({
  type: MERCHANTS_MODAL_CLOSE,
});

const filterMerchants = (
  firstChar: string,
  merchantsList: Merchant[],
): Merchant[] =>
  merchantsList.filter((merchant) =>
    merchant.description.startsWith(firstChar),
  );
