import React from 'react';
import { GlobalDispatch } from '../../app/store/redux';
import { SESSION_ACCOUNT_FILTERS } from '../../common/utils/constants';
import { SessionStorage } from '../../common/utils/sessionStorageHelper';
import {
  ACCOUNTS_CLEAR_FILTERS,
  ACCOUNTS_SET_FILTER,
  ACCOUNTS_UNMOUNT,
} from '../types/accounts.action.types';
import {
  Account,
  AccountFilters,
  AccountsReducerAction,
} from '../types/accounts.data.types';

export const resetOnPageLeave = () => {
  return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
    dispatch({
      type: ACCOUNTS_UNMOUNT,
    });
  };
};

export const clearAccountsFilter = (): Partial<AccountsReducerAction> => {
  SessionStorage.removeItems([SESSION_ACCOUNT_FILTERS]);

  return {
    type: ACCOUNTS_CLEAR_FILTERS,
  };
};

export const setAccountsFilter = (
  selectedFilter: string,
  selectedValue: string,
  accountsList: Account[],
): Partial<AccountsReducerAction> => {
  let accountFilters = SessionStorage.getItem(
    SESSION_ACCOUNT_FILTERS,
  ) as AccountFilters;

  switch (selectedFilter) {
    case 'type': {
      accountFilters = {
        ...accountFilters,
        accountTypeId: selectedValue,
      };
      break;
    }
    case 'bank': {
      accountFilters = {
        ...accountFilters,
        bankId: selectedValue,
      };
      break;
    }
    case 'status': {
      accountFilters = {
        ...accountFilters,
        status: selectedValue,
      };
      break;
    }
  }

  const displayAccountsList = filterAccounts(accountFilters, accountsList);
  SessionStorage.setItem(SESSION_ACCOUNT_FILTERS, accountFilters);
  return {
    type: ACCOUNTS_SET_FILTER,
    accountFilters,
    displayAccountsList,
  };
};

const filterAccounts = (
  accountFilters: AccountFilters,
  accountsList: Account[],
): Account[] => {
  let filteredAccounts = accountsList;

  if (accountFilters) {
    if (accountFilters.accountTypeId) {
      filteredAccounts = filteredAccounts.filter(
        (account) => account.refAccountType.id === accountFilters.accountTypeId,
      );
    }

    if (accountFilters.bankId) {
      filteredAccounts = filteredAccounts.filter(
        (account) => account.refBank.id === accountFilters.bankId,
      );
    }

    if (accountFilters.status) {
      filteredAccounts = filteredAccounts.filter(
        (account) => account.status === accountFilters.status,
      );
    }
  }

  return filteredAccounts;
};
