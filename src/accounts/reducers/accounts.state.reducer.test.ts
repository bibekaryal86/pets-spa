import { ACCOUNTS_SAMPLE_DATA } from '../../common/fixtures/accounts.sample.data';
import { ACCOUNTS_CLEAR_FILTERS, ACCOUNTS_SET_FILTER } from '../types/accounts.action.types';
import { DefaultAccountsReducerState } from '../types/accounts.data.types';
import accounts from './accounts.state.reducer';

describe('accounts state reducer', () => {
  const currentState = {
    displayAccountsList: ACCOUNTS_SAMPLE_DATA,
    accountFilters: {},
  };

  const displayAccountsListFilteredByType = ACCOUNTS_SAMPLE_DATA.filter(
    (account) => account.refAccountType.id === '5ede4cf30525eb78290332e7',
  );

  const returnStateFilteredByType = {
    displayAccountsList: displayAccountsListFilteredByType,
    accountFilters: {
      accountTypeId: '5ede4cf30525eb78290332e7',
    },
  };

  const displayAccountsListFilteredByBank = ACCOUNTS_SAMPLE_DATA.filter(
    (account) => account.refBank.id === '5ede4d8d0525eb78290332f0',
  );

  const returnStateFilteredByBank = {
    displayAccountsList: displayAccountsListFilteredByBank,
    accountFilters: {
      bankId: '5ede4d8d0525eb78290332f0',
    },
  };

  const displayAccountsListFilteredByStatus = ACCOUNTS_SAMPLE_DATA.filter((account) => account.status === 'ACTIVE');

  const returnStateFilteredByStatus = {
    displayAccountsList: displayAccountsListFilteredByStatus,
    accountFilters: {
      status: 'ACTIVE',
    },
  };

  it('returns current state', () => {
    expect(
      accounts(currentState, {
        type: 'SOME_TYPE',
        ...DefaultAccountsReducerState,
      }),
    ).toEqual(currentState);
  });

  it('sets account type filter and returns display accounts list', () => {
    expect(
      accounts(currentState, {
        type: ACCOUNTS_SET_FILTER,
        ...currentState,
        accountFilters: {
          accountTypeId: '5ede4cf30525eb78290332e7',
        },
        displayAccountsList: displayAccountsListFilteredByType,
      }),
    ).toEqual(returnStateFilteredByType);
  });

  it('sets account bank filter and returns display accounts list', () => {
    expect(
      accounts(currentState, {
        type: ACCOUNTS_SET_FILTER,
        ...currentState,
        accountFilters: {
          bankId: '5ede4d8d0525eb78290332f0',
        },
        displayAccountsList: displayAccountsListFilteredByBank,
      }),
    ).toEqual(returnStateFilteredByBank);
  });

  it('sets account status filter and returns display accounts list', () => {
    expect(
      accounts(currentState, {
        type: ACCOUNTS_SET_FILTER,
        ...currentState,
        accountFilters: {
          status: 'ACTIVE',
        },
        displayAccountsList: displayAccountsListFilteredByStatus,
      }),
    ).toEqual(returnStateFilteredByStatus);
  });

  it('clears accounts filters', () => {
    expect(
      accounts(returnStateFilteredByBank, {
        type: ACCOUNTS_CLEAR_FILTERS,
      }),
    ).toEqual(DefaultAccountsReducerState);
  });
});
