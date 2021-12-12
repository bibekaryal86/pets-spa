import {TRANSACTIONS_DELETE_SUCCESS} from '../../transactions/types/transactions.action.types';
import {
    MERCHANTS_DELETE_FAILURE,
    MERCHANTS_DELETE_SUCCESS,
    MERCHANTS_EDIT_FAILURE,
    MERCHANTS_EDIT_SUCCESS,
    MERCHANTS_GET_FAILURE,
    MERCHANTS_GET_REQUEST,
    MERCHANTS_GET_SUCCESS,
    MERCHANTS_SELECT_MERCHANT,
    MERCHANTS_SELECT_MERCHANT_TRANSACTIONS,
    MERCHANTS_UNMOUNT,
} from '../types/merchants.action.types';
import {DefaultMerchant, DefaultMerchantsState, MerchantsAction, MerchantsState,} from '../types/merchants.data.types';

const initialState = DefaultMerchantsState;

export default function merchants(
    state = initialState,
    action: MerchantsAction,
): MerchantsState {
    switch (action.type) {
        case MERCHANTS_GET_REQUEST:
            return {
                ...state,
            };
        case MERCHANTS_GET_SUCCESS:
            return {
                ...state,
                error: '',
                merchantsList: action.merchantsList,
                merchantsFiltersList: action.merchantsFiltersList,
                merchantsNotUsedInTxnsList: action.merchantsNotUsedInTxnsList,
            };
        case MERCHANTS_GET_FAILURE:
        case MERCHANTS_DELETE_FAILURE:
        case MERCHANTS_EDIT_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case MERCHANTS_DELETE_SUCCESS:
        case MERCHANTS_EDIT_SUCCESS:
            return {
                ...state,
                success: action.success,
                merchantsList: [], // so that it will refetch
            };
        case MERCHANTS_SELECT_MERCHANT:
            return {
                ...state,
                selectedMerchant: action.selectedMerchant,
            };
        case MERCHANTS_SELECT_MERCHANT_TRANSACTIONS:
            return {
                ...state,
                selectedMerchantTransactions: action.selectedMerchantTransactions,
            };
        case TRANSACTIONS_DELETE_SUCCESS:
            return {
                ...state,
                selectedMerchantTransactions: [],
            };
        case MERCHANTS_UNMOUNT:
            return {
                ...state,
                error: '',
                success: '',
                selectedMerchant: DefaultMerchant,
                selectedMerchantTransactions: [],
            };
        default:
            return state;
    }
}
