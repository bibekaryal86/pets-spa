import {TRANSACTIONS_DELETE_SUCCESS} from '../../transactions/types/transactions.action.types';
import {
    ACCOUNTS_DELETE_FAILURE,
    ACCOUNTS_DELETE_REQUEST,
    ACCOUNTS_DELETE_SUCCESS,
    ACCOUNTS_EDIT_FAILURE,
    ACCOUNTS_EDIT_REQUEST,
    ACCOUNTS_EDIT_SUCCESS,
    ACCOUNTS_GET_FAILURE,
    ACCOUNTS_GET_REQUEST,
    ACCOUNTS_GET_SUCCESS,
    ACCOUNTS_SELECT_ACCOUNT,
    ACCOUNTS_SELECT_ACCOUNT_TRANSACTIONS,
    ACCOUNTS_UNMOUNT,
} from '../types/accounts.action.types';
import {AccountsAction, AccountsState, DefaultAccount, DefaultAccountsState,} from '../types/accounts.data.types';

const initialState = DefaultAccountsState;

export default function accounts(
    state = initialState,
    action: AccountsAction,
): AccountsState {
    switch (action.type) {
        case ACCOUNTS_GET_REQUEST:
            return {
                ...state,
            };
        case ACCOUNTS_GET_SUCCESS:
            return {
                ...state,
                error: '',
                accountsList: action.accountsList,
            };
        case ACCOUNTS_EDIT_REQUEST:
        case ACCOUNTS_DELETE_REQUEST:
            return {
                ...state,
                error: '',
                success: '',
            };
        case ACCOUNTS_GET_FAILURE:
        case ACCOUNTS_EDIT_FAILURE:
        case ACCOUNTS_DELETE_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case ACCOUNTS_EDIT_SUCCESS:
        case ACCOUNTS_DELETE_SUCCESS:
            return {
                ...state,
                success: action.success,
                accountsList: [], // so that it will refetch
            };
        case ACCOUNTS_SELECT_ACCOUNT:
            return {
                ...state,
                selectedAccount: action.selectedAccount,
            };
        case ACCOUNTS_SELECT_ACCOUNT_TRANSACTIONS:
            return {
                ...state,
                selectedAccountTransactions: action.selectedAccountTransactions,
            };
        case TRANSACTIONS_DELETE_SUCCESS:
            return {
                ...state,
                selectedAccountTransactions: [],
            };
        case ACCOUNTS_UNMOUNT:
            return {
                ...state,
                error: '',
                success: '',
                selectedAccount: DefaultAccount,
                selectedAccountTransactions: [],
            };
        default:
            return state;
    }
}
