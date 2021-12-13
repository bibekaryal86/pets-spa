import {
  MERCHANTS_CLEAR_FILTER,
  MERCHANTS_DELETE_MODAL_ACTION,
  MERCHANTS_MODAL_CLOSE,
  MERCHANTS_MODAL_INPUT,
  MERCHANTS_SET_MERCHANT_IN_ACTION,
  MERCHANTS_SET_NAME_BEGINS_WITH,
  MERCHANTS_SHOW_NOT_USED_IN_TXNS_ONLY,
  MERCHANTS_UPDATE_MODAL_ACTION,
} from '../types/merchants.action.types';
import {
  MerchantsReducerAction,
  MerchantsReducerState,
} from '../types/merchants.data.types';

export default (
  state: MerchantsReducerState,
  action: Partial<MerchantsReducerAction>,
): MerchantsReducerState => {
  switch (action.type) {
    case MERCHANTS_SET_MERCHANT_IN_ACTION:
      return {
        ...state,
        merchantInActionId: action.merchantInActionId || '',
        merchantInActionDesc: action.merchantInActionDesc || '',
      };
    case MERCHANTS_SHOW_NOT_USED_IN_TXNS_ONLY:
      return {
        ...state,
        showNotUsedInTxnsOnly: action.showNotUsedInTxnsOnly || false,
        merchantNameBeginsWith: '',
        displayMerchantsList: action.displayMerchantsList || [],
      };
    case MERCHANTS_SET_NAME_BEGINS_WITH:
      return {
        ...state,
        merchantNameBeginsWith: action.merchantNameBeginsWith || '',
        displayMerchantsList: action.displayMerchantsList || [],
        showNotUsedInTxnsOnly: false,
      };
    case MERCHANTS_CLEAR_FILTER:
      return {
        ...state,
        showNotUsedInTxnsOnly: false,
        merchantNameBeginsWith: '',
        displayMerchantsList: [],
      };
    case MERCHANTS_DELETE_MODAL_ACTION:
      return {
        ...state,
        isDeleteModalOpen: action.isDeleteModalOpen || false,
      };
    case MERCHANTS_UPDATE_MODAL_ACTION:
      return {
        ...state,
        isUpdateModalOpen: action.isUpdateModalOpen || false,
      };
    case MERCHANTS_MODAL_INPUT:
      return {
        ...state,
        modalInput: action.modalInput || '',
      };
    case MERCHANTS_MODAL_CLOSE:
      return {
        ...state,
        isDeleteModalOpen: false,
        isUpdateModalOpen: false,
        modalInput: '',
      };

    default:
      return {
        ...state,
      };
  }
};
