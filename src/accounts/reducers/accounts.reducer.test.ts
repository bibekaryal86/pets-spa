import { ACCOUNTS_SAMPLE_DATA } from '../../common/fixtures/accounts.sample.data';
import {
  ACCOUNTS_DELETE_SUCCESS,
  ACCOUNTS_EDIT_FAILURE,
  ACCOUNTS_EDIT_REQUEST,
  ACCOUNTS_GET_REQUEST,
  ACCOUNTS_GET_SUCCESS,
  ACCOUNTS_SELECT_ACCOUNT,
  ACCOUNTS_SELECT_ACCOUNT_TRANSACTIONS,
  ACCOUNTS_UNMOUNT,
} from '../types/accounts.action.types';
import { DefaultAccountsState } from '../types/accounts.data.types';
import accounts from './accounts.reducer';
import { DefaultTransaction } from '../../transactions/types/transactions.data.types';
import { TRANSACTIONS_DELETE_SUCCESS } from '../../transactions/types/transactions.action.types';

describe('accounts reducer', () => {
  const currentState = {
    ...DefaultAccountsState,
    accountsList: ACCOUNTS_SAMPLE_DATA,
  };
  const currentStateWithError = { ...currentState, error: 'error-message' };
  const currentStateWithSuccess = {
    ...currentState,
    accountsList: [],
    success: 'success-message',
  };
  const currentStateWithSelectedTxns = {
    ...currentState,
    selectedAccountTransactions: [DefaultTransaction],
  };

  it('returns default state', () => {
    expect(
      accounts(DefaultAccountsState, {
        type: 'SOME_TYPE',
        ...DefaultAccountsState,
        error: 'whatever',
        success: 'so and so',
      }),
    ).toEqual(DefaultAccountsState);
  });

  it('returns current state', () => {
    expect(
      accounts(currentState, {
        type: 'SOME_TYPE',
        ...DefaultAccountsState,
      }),
    ).toEqual(currentState);
  });

  it('returns current state for get accounts request', () => {
    expect(
      accounts(DefaultAccountsState, {
        type: ACCOUNTS_GET_REQUEST,
        ...DefaultAccountsState,
        error: 'whatever',
        success: 'so and so',
      }),
    ).toEqual(DefaultAccountsState);
  });

  it('returns list of accounts for get accounts success', () => {
    expect(
      accounts(DefaultAccountsState, {
        type: ACCOUNTS_GET_SUCCESS,
        ...currentState,
      }).accountsList,
    ).toEqual(ACCOUNTS_SAMPLE_DATA);
  });

  it('returns current state and clears messages for edit accounts request', () => {
    expect(
      accounts(currentStateWithError, {
        type: ACCOUNTS_EDIT_REQUEST,
        ...currentState,
      }),
    ).toEqual(currentState);
  });

  it('returns current state and error message for accounts failure', () => {
    expect(
      accounts(currentState, {
        type: ACCOUNTS_EDIT_FAILURE,
        ...currentStateWithError,
      }),
    ).toEqual(currentStateWithError);
  });

  it('returns current state and success message for edit accounts success', () => {
    expect(
      accounts(currentState, {
        type: ACCOUNTS_DELETE_SUCCESS,
        ...currentStateWithSuccess,
      }),
    ).toEqual(currentStateWithSuccess);
  });

  it('returns selected account', () => {
    expect(
      accounts(currentState, {
        type: ACCOUNTS_SELECT_ACCOUNT,
        ...DefaultAccountsState,
        selectedAccount: ACCOUNTS_SAMPLE_DATA[0],
      }),
    ).toEqual({ ...currentState, selectedAccount: ACCOUNTS_SAMPLE_DATA[0] });
  });

  it('returns selected account transactions', () => {
    expect(
      accounts(currentState, {
        type: ACCOUNTS_SELECT_ACCOUNT_TRANSACTIONS,
        ...DefaultAccountsState,
        selectedAccountTransactions: [DefaultTransaction],
      }),
    ).toEqual({
      ...currentState,
      selectedAccountTransactions: [DefaultTransaction],
    });
  });

  it('returns empty selected account transactions for delete success', () => {
    expect(
      accounts(currentStateWithSelectedTxns, {
        type: TRANSACTIONS_DELETE_SUCCESS,
        ...DefaultAccountsState,
      }),
    ).toEqual(currentState);
  });

  it('resets on accounts unmount except list of accounts', () => {
    expect(
      accounts(currentStateWithError, {
        type: ACCOUNTS_UNMOUNT,
        ...DefaultAccountsState,
      }),
    ).toEqual(currentState);
  });
});
