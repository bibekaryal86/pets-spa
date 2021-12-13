import {
  ACCOUNTS_CLEAR_FILTERS,
  ACCOUNTS_SET_FILTER,
} from '../types/accounts.action.types';
import {
  AccountsReducerAction,
  AccountsReducerState,
  DefaultAccountsReducerState,
} from '../types/accounts.data.types';

const initialState = DefaultAccountsReducerState;

export default function accounts(
  state = initialState,
  action: Partial<AccountsReducerAction>,
): AccountsReducerState {
  switch (action.type) {
    case ACCOUNTS_SET_FILTER:
      return {
        ...state,
        displayAccountsList: action.displayAccountsList || [],
        accountFilters: action.accountFilters || {},
      };
    case ACCOUNTS_CLEAR_FILTERS:
      return {
        ...state,
        displayAccountsList: [],
        accountFilters: {},
      };
    default:
      return state;
  }
}
