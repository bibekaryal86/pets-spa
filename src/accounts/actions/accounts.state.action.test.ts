import { clearAccountsFilter, resetOnPageLeave, setAccountsFilter } from './accounts.state.action';
import { ACCOUNTS_SAMPLE_DATA } from '../../common/fixtures/accounts.sample.data';
import { ACCOUNTS_CLEAR_FILTERS, ACCOUNTS_SET_FILTER, ACCOUNTS_UNMOUNT } from '../types/accounts.action.types';
import { SessionStorage } from '../../common/utils/sessionStorageHelper';
import { SESSION_ACCOUNT_FILTERS } from '../../common/utils/constants';

describe('account state actions', () => {
  const sessionRemoveSpy = jest.spyOn(SessionStorage, 'removeItems');
  const dispatchSpy = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('test reset on page leave', () => {
    resetOnPageLeave()(dispatchSpy);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: ACCOUNTS_UNMOUNT,
    });
  });

  it('test clear accounts filter', () => {
    const clearFilters = clearAccountsFilter();

    expect(sessionRemoveSpy).toHaveBeenCalledTimes(1);
    expect(sessionRemoveSpy).toHaveBeenCalledWith([SESSION_ACCOUNT_FILTERS]);
    expect(clearFilters).toEqual({
      type: ACCOUNTS_CLEAR_FILTERS,
    });
  });

  describe('filters accounts', () => {
    const setSessionSpy = jest.spyOn(SessionStorage, 'setItem');

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('filters by account type', () => {
      const accountFilters = {
        accountTypeId: '5ede4cf30525eb78290332e7',
      };
      const displayAccountsList = ACCOUNTS_SAMPLE_DATA.filter(
        (account) => account.refAccountType.id === accountFilters.accountTypeId,
      );

      const expected = {
        type: ACCOUNTS_SET_FILTER,
        accountFilters,
        displayAccountsList,
      };

      const received = setAccountsFilter('type', accountFilters.accountTypeId, ACCOUNTS_SAMPLE_DATA);

      expect(received).toEqual(expected);
      expect(setSessionSpy).toHaveBeenCalledWith(SESSION_ACCOUNT_FILTERS, accountFilters);
    });

    it('filters by bank', () => {
      const accountFilters = {
        bankId: '5ede4d8d0525eb78290332f0',
      };
      const displayAccountsList = ACCOUNTS_SAMPLE_DATA.filter(
        (account) => account.refBank.id === accountFilters.bankId,
      );

      const expected = {
        type: ACCOUNTS_SET_FILTER,
        accountFilters,
        displayAccountsList,
      };

      const received = setAccountsFilter('bank', accountFilters.bankId, ACCOUNTS_SAMPLE_DATA);

      expect(received).toEqual(expected);
      expect(setSessionSpy).toHaveBeenCalledWith(SESSION_ACCOUNT_FILTERS, accountFilters);
    });

    it('filters by status', () => {
      const getSessionSpy = jest
        .spyOn(SessionStorage, 'getItem')
        .mockReturnValue({ bankId: '5ede4d8d0525eb78290332f0' });

      const accountFilters = {
        bankId: '5ede4d8d0525eb78290332f0',
        status: 'ACTIVE',
      };

      const accountsList = ACCOUNTS_SAMPLE_DATA.filter((account) => account.refBank.id === accountFilters.bankId);
      const displayAccountsList = accountsList.filter((account) => account.status === accountFilters.status);

      const expected = {
        type: ACCOUNTS_SET_FILTER,
        accountFilters,
        displayAccountsList,
      };

      const received = setAccountsFilter('status', 'ACTIVE', accountsList);

      expect(received).toEqual(expected);
      expect(getSessionSpy).toHaveBeenCalledTimes(1);
      expect(getSessionSpy).toHaveBeenCalledWith(SESSION_ACCOUNT_FILTERS);
      expect(setSessionSpy).toHaveBeenCalledTimes(1);
      expect(setSessionSpy).toHaveBeenCalledWith(SESSION_ACCOUNT_FILTERS, accountFilters);
    });
  });
});
