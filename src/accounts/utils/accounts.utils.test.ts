import { ACCOUNTS_SAMPLE_DATA } from '../../common/fixtures/accounts.sample.data';
import {
  REF_ACCOUNT_TYPES,
  REF_ACCOUNT_TYPES_SELECT_OPTIONS,
  REF_BANKS,
  REF_BANKS_SELECT_OPTIONS,
} from '../../common/fixtures/refTypes.sample.data';
import { Account } from '../types/accounts.data.types';
import {
  filterAccountBankOptions,
  filterAccountStatusOptions,
  filterAccountTypeOptions,
  getDisplayAccounts,
  getFiltersCurrentlyApplied,
  handleOneAccountFieldChange,
  isAccountFilterApplied,
  numberDollarFormat,
  validateAccount,
} from './accounts.utils';

describe('account utils', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('account type select options', () => {
    const expectedSelectOptions = REF_ACCOUNT_TYPES_SELECT_OPTIONS;
    const actualSelectOptions = filterAccountTypeOptions(REF_ACCOUNT_TYPES);
    expect(actualSelectOptions).toEqual(expectedSelectOptions);
  });

  it('account bank select options', () => {
    const expectedSelectOptions = REF_BANKS_SELECT_OPTIONS;
    const actualSelectOptions = filterAccountBankOptions(REF_BANKS);
    expect(actualSelectOptions).toEqual(expectedSelectOptions);
  });

  it('account status select options', () => {
    const expectedSelectOptions = [
      {
        text: 'Please Select',
        value: '',
      },
      {
        text: 'ACTIVE',
        value: 'ACTIVE',
      },
      {
        text: 'CLOSED',
        value: 'CLOSED',
      },
    ];
    const actualSelectOptions = filterAccountStatusOptions();
    expect(actualSelectOptions).toEqual(expectedSelectOptions);
  });

  it('number dollar format for deposit accounts and no dollar sign', () => {
    const expectedNumber = '1.07';
    const actualNumber = numberDollarFormat(
      1.07,
      '5ede4cc80525eb78290332e5',
      true,
    );
    expect(actualNumber).toEqual(expectedNumber);
  });

  it('number dollar format for loan accounts with dollar sign', () => {
    const expectedNumber = '-$1.07';
    const actualNumber = numberDollarFormat(1.07, '5ede4cf30525eb78290332e7');
    expect(actualNumber).toEqual(expectedNumber);
  });

  describe('validate account', () => {
    it('returns empty response for validated account', () => {
      expect(validateAccount(ACCOUNTS_SAMPLE_DATA[0])).toEqual('');
    });

    it('returns names of attributes which are not validated', () => {
      const account = {
        ...ACCOUNTS_SAMPLE_DATA[0],
        status: '',
        description: '',
      };
      const invalids = validateAccount(account);
      expect(invalids).toContain('[Account Status]');
      expect(invalids).toContain('[Account Name]');
    });
  });

  describe('account filters', () => {
    it('checks if filter applied or not, returns false', () => {
      const isFilterApplied = isAccountFilterApplied({});
      expect(isFilterApplied).toBeFalsy();

      const isFilterAppliedNext = isAccountFilterApplied({
        accountTypeId: '',
        status: null,
      });
      expect(isFilterAppliedNext).toBeFalsy();
    });

    it('checks if filter applied or not, returns true', () => {
      const isFilterApplied = isAccountFilterApplied({ bankId: 'abcd' });
      expect(isFilterApplied).toBeTruthy();
    });

    it('returns filters currently applied, empty response', () => {
      const filtersApplied = getFiltersCurrentlyApplied({});
      expect(filtersApplied).toEqual('');
    });

    it('returns filter that is applied, one filter', () => {
      const filtersApplied = getFiltersCurrentlyApplied({
        accountTypeId: 'abcd',
      });
      expect(filtersApplied).toContain('[Account Type]');
      expect(filtersApplied).not.toContain('[Bank]');
      expect(filtersApplied).not.toContain('[Account Status]');
    });

    it('returns filter that is applied, more than one filters', () => {
      const filtersApplied = getFiltersCurrentlyApplied({
        accountTypeId: 'abcd',
        status: 'efgh',
      });
      expect(filtersApplied).toContain('[Account Type]');
      expect(filtersApplied).not.toContain('[Bank]');
      expect(filtersApplied).toContain('[Account Status]');
    });
  });

  describe('display accounts', () => {
    const displayAccountsList = [
      ACCOUNTS_SAMPLE_DATA[0],
      ACCOUNTS_SAMPLE_DATA[1],
    ];
    const accountsList = ACCOUNTS_SAMPLE_DATA;

    it('returns accounts list when filter is not set', () => {
      const displayAccounts = getDisplayAccounts(
        false,
        displayAccountsList,
        accountsList,
      );
      expect(displayAccounts).toEqual(accountsList);
    });

    it('returns display accounts list when filter is set', () => {
      const displayAccounts = getDisplayAccounts(
        true,
        displayAccountsList,
        accountsList,
      );
      expect(displayAccounts).toEqual(displayAccountsList);
    });
  });

  describe('handle one account field change', () => {
    const accountData: Account = ACCOUNTS_SAMPLE_DATA[0];
    const mockSetAccountData = jest.fn();

    it('updates account type', () => {
      handleOneAccountFieldChange(
        'updated_account_type',
        'type',
        accountData,
        mockSetAccountData,
      );
      expect(mockSetAccountData).toHaveBeenCalledWith({
        account: {
          ...accountData,
          refAccountType: {
            id: 'updated_account_type',
            description: '',
          },
        },
      });
    });

    it('updates account bank', () => {
      handleOneAccountFieldChange(
        'updated_account_bank',
        'bank',
        accountData,
        mockSetAccountData,
      );
      expect(mockSetAccountData).toHaveBeenCalledWith({
        account: {
          ...accountData,
          refBank: {
            id: 'updated_account_bank',
            description: '',
          },
        },
      });
    });

    it('updates account status', () => {
      handleOneAccountFieldChange(
        'updated_account_status',
        'status',
        accountData,
        mockSetAccountData,
      );
      expect(mockSetAccountData).toHaveBeenCalledWith({
        account: {
          ...accountData,
          status: 'updated_account_status',
        },
      });
    });

    it('updates account name', () => {
      handleOneAccountFieldChange(
        'updated_account_name',
        'name',
        accountData,
        mockSetAccountData,
      );
      expect(mockSetAccountData).toHaveBeenCalledWith({
        account: {
          ...accountData,
          description: 'updated_account_name',
        },
      });
    });

    it('updates account opening balance', () => {
      handleOneAccountFieldChange(
        'updated_account_opening_balance',
        'opening',
        accountData,
        mockSetAccountData,
      );
      expect(mockSetAccountData).toHaveBeenCalledWith({
        account: {
          ...accountData,
          openingBalance: 'updated_account_opening_balance',
        },
      });
    });
  });
});
