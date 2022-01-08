import {
  TRANSACTIONS_DELETE_FAILURE,
  TRANSACTIONS_DELETE_REQUEST,
  TRANSACTIONS_DELETE_SUCCESS,
  TRANSACTIONS_EDIT_FAILURE,
  TRANSACTIONS_EDIT_REQUEST,
  TRANSACTIONS_EDIT_SUCCESS,
  TRANSACTIONS_GET_FAILURE,
  TRANSACTIONS_GET_REQUEST,
  TRANSACTIONS_GET_SUCCESS,
  TRANSACTIONS_SELECT_TRANSACTION,
  TRANSACTIONS_UNMOUNT,
} from '../types/transactions.action.types';
import {
  DefaultTransaction,
  DefaultTransactionsState,
  TransactionsAction,
  TransactionsState,
} from '../types/transactions.data.types';

const initialState = DefaultTransactionsState;

export default function transactions(state = initialState, action: TransactionsAction): TransactionsState {
  switch (action.type) {
    case TRANSACTIONS_GET_REQUEST:
      return {
        ...state,
      };
    case TRANSACTIONS_GET_SUCCESS:
      return {
        ...state,
        error: '',
        transactionsList: action.transactionsList,
      };
    case TRANSACTIONS_GET_FAILURE:
    case TRANSACTIONS_EDIT_FAILURE:
    case TRANSACTIONS_DELETE_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case TRANSACTIONS_EDIT_REQUEST:
    case TRANSACTIONS_DELETE_REQUEST:
      return {
        ...state,
        error: '',
        success: '',
      };
    case TRANSACTIONS_EDIT_SUCCESS:
    case TRANSACTIONS_DELETE_SUCCESS:
      return {
        ...state,
        success: action.success,
        transactionsList: [], // so that it will refetch
      };
    case TRANSACTIONS_SELECT_TRANSACTION:
      return {
        ...state,
        selectedTransaction: action.selectedTransaction,
      };
    case TRANSACTIONS_UNMOUNT:
      return {
        ...state,
        error: '',
        success: '',
        selectedTransaction: DefaultTransaction,
      };
    default:
      return state;
  }
}
