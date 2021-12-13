import {
  TRANSACTIONS_RESET_FILTERS,
  TRANSACTIONS_SET_FILTER,
  TRANSACTIONS_SET_FILTERS,
} from '../types/transactions.action.types';
import {
  DefaultTransactionFilters,
  TransactionsReducerAction,
  TransactionsReducerState,
} from '../types/transactions.data.types';

export default (
  state: TransactionsReducerState,
  action: Partial<TransactionsReducerAction>,
): TransactionsReducerState => {
  switch (action.type) {
    case TRANSACTIONS_SET_FILTER:
      return {
        ...state,
        transactionFilters:
          action.transactionFilters || DefaultTransactionFilters,
      };
    case TRANSACTIONS_SET_FILTERS:
      return {
        ...state,
        transactionFilters:
          action.transactionFilters || DefaultTransactionFilters,
        displayTransactionsList: action.displayTransactionsList || [],
      };
    case TRANSACTIONS_RESET_FILTERS:
      return {
        ...state,
        transactionFilters: DefaultTransactionFilters,
        displayTransactionsList: [],
      };
    default:
      return state;
  }
};
