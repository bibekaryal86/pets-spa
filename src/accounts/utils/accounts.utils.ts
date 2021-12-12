import {SelectOptionProps} from '../../common/forms/Select';
import {RefAccountType, RefBank,} from '../../common/types/refTypes.data.types';
import {ACCOUNT_STATUSES, ACCOUNT_TYPES_LOAN_ACCOUNTS,} from '../../common/utils/constants';
import {Account, AccountFilters, OneAccountAction, OneAccountUpdate,} from '../types/accounts.data.types';

export const filterAccountTypeOptions = (
    accountTypes: RefAccountType[],
): SelectOptionProps[] => {
    const accountTypeSelectOptions: SelectOptionProps[] = [
        {text: 'Please Select', value: ''},
    ];

    accountTypes.forEach((type) =>
        accountTypeSelectOptions.push({text: type.description, value: type.id}),
    );

    return accountTypeSelectOptions;
};

export const filterAccountBankOptions = (
    banks: RefBank[],
): SelectOptionProps[] => {
    const accountBankSelectOptions: SelectOptionProps[] = [
        {text: 'Please Select', value: ''},
    ];

    banks.forEach((bank) =>
        accountBankSelectOptions.push({text: bank.description, value: bank.id}),
    );

    return accountBankSelectOptions;
};

export const filterAccountStatusOptions = (): SelectOptionProps[] => {
    const accountStatusSelectOptions: SelectOptionProps[] = [
        {text: 'Please Select', value: ''},
    ];

    ACCOUNT_STATUSES.forEach((status) =>
        accountStatusSelectOptions.push({text: status, value: status}),
    );

    return accountStatusSelectOptions;
};

export const numberDollarFormat = (
    inputAmount: number,
    typeId: string,
    doNotReturnDollarSign?: boolean,
): string => {
    if (
        inputAmount &&
        inputAmount > 0 &&
        ACCOUNT_TYPES_LOAN_ACCOUNTS.includes(typeId)
    ) {
        inputAmount = inputAmount * -1;
    }

    if (doNotReturnDollarSign) {
        return inputAmount.toString();
    } else {
        return numberFormatter(inputAmount);
    }
};

export const numberFormatter = (inputAmount: number): string => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
    });

    return formatter.format(inputAmount);
};

// export const numberFormatter = (input: string): boolean => {
//   const pattern = /^[1-9]\d*(?:\.\d{0,2})?$/;
//   return pattern.test(input);
// };

export const validateAccount = (account: Account): string => {
    let invalids = '';

    if (!account.description || account.description.length < 5) {
        invalids += ' [Account Name] ';
    }

    // opening balance will be 0 so !account.openingBalance will be false

    if (!account.refAccountType || !account.refAccountType.id) {
        invalids += ' [Account Type] ';
    }

    if (!account.refBank || !account.refBank.id) {
        invalids += ' [Bank] ';
    }

    if (!account.status) {
        invalids += ' [Account Status] ';
    }

    return invalids;
};

export const isAccountFilterApplied = (
    accountFilters: AccountFilters,
): boolean => {
    const filterApplied =
        (accountFilters &&
            (accountFilters.accountTypeId ||
                accountFilters.bankId ||
                accountFilters.status)) ||
        '';

    return filterApplied.length > 0;
};

export const getFiltersCurrentlyApplied = (
    accountFilters: AccountFilters,
): string => {
    let filterText = '';
    if (accountFilters?.accountTypeId) {
        filterText += '[Account Type]';
    }
    if (accountFilters?.bankId) {
        filterText += '[Bank]';
    }
    if (accountFilters?.status) {
        filterText += '[Account Status]';
    }
    if (filterText) {
        return 'Filters Currently Applied: ' + filterText;
    } else {
        return '';
    }
};

export const getDisplayAccounts = (
    isFilterApplied: boolean,
    displayAccountsList: Account[],
    accountsList: Account[],
): Account[] => (isFilterApplied ? displayAccountsList : accountsList);

export const handleOneAccountFieldChange = (
    input: string,
    name: string,
    accountData: Account,
    setAccountData: ({account}: OneAccountAction) => void,
): void => {
    let changedAccount;
    switch (name) {
        case 'type':
            changedAccount = getChangedAccount({typeId: input}, accountData);
            setAccountData({account: changedAccount});
            break;
        case 'bank':
            changedAccount = getChangedAccount({bankId: input}, accountData);
            setAccountData({account: changedAccount});
            break;
        case 'status':
            changedAccount = getChangedAccount({status: input}, accountData);
            setAccountData({account: changedAccount});
            break;
        case 'name':
            changedAccount = getChangedAccount({description: input}, accountData);
            setAccountData({account: changedAccount});
            break;
        case 'opening':
            changedAccount = getChangedAccount(
                {openingBalance: input},
                accountData,
            );
            setAccountData({account: changedAccount});
            break;
    }
};

const getChangedAccount = (
    {
        description,
        openingBalance,
        typeId,
        bankId,
        status,
    }: Partial<OneAccountUpdate>,
    accountData: Account,
): Account => {
    return {
        id: accountData.id,
        description: setInputFieldValue(description, accountData.description),
        openingBalance: setInputFieldValue(
            openingBalance,
            accountData.openingBalance,
        ),
        currentBalance: accountData.currentBalance,
        status: status ? status : accountData.status,
        user: accountData.user,
        refAccountType: typeId
            ? {id: typeId, description: ''}
            : accountData.refAccountType,
        refBank: bankId ? {id: bankId, description: ''} : accountData.refBank,
    };
};

const setInputFieldValue = (
    inputValue: string | undefined,
    defaultValue: string,
) => (inputValue === undefined ? defaultValue : inputValue);
