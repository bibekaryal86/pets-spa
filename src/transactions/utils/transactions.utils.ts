import { Account } from '../../accounts/types/accounts.data.types';
import { numberFormatter } from '../../accounts/utils/accounts.utils';
import { SelectOptionProps } from '../../common/forms/Select';
import {
  RefCategory,
  RefCategoryType,
  RefTransactionType,
} from '../../common/types/refTypes.data.types';
import {
  TRANSACTION_TYPE_ID_EXPENSE,
  TRANSACTION_TYPE_ID_TRANSFER,
} from '../../common/utils/constants';
import { Merchant } from '../../merchants/types/merchants.data.types';
import {
  DefaultTransactionFilters,
  OneTransactionOne,
  Transaction,
  TransactionFilters,
} from '../types/transactions.data.types';

export const isTransactionTypeTransfer = (transactionTypeId: string): boolean =>
  transactionTypeId === TRANSACTION_TYPE_ID_TRANSFER;

export const toUppercaseRemoveApostrophe = (input: string): string =>
  input ? input.toUpperCase().replace("/'/g", '') : '';

export const getQueryParamsValue = (
  search: string,
): { accountId: string; merchantId: string } => {
  const filteredSearch = search.slice(1);
  const queryParams = filteredSearch.split('&');
  let accountId = '';
  let merchantId = '';

  queryParams.some((param) => {
    if (param.includes('merchantId')) {
      merchantId = param.split('=')[1];
    }

    if (param.includes('accountId')) {
      accountId = param.split('=')[1];
    }

    if (merchantId && merchantId === ':id') {
      merchantId = '';
    }

    if (accountId && accountId === ':id') {
      accountId = '';
    }
  });

  return { accountId, merchantId };
};

export const isTransactionDataUpdated = (
  transaction: Transaction,
  oneTransactionOne: OneTransactionOne,
): boolean =>
  transaction.refTransactionType.id === oneTransactionOne.transactionTypeId &&
  transaction.refCategory.refCategoryType.id ===
    oneTransactionOne.categoryTypeId &&
  transaction.refCategory.id === oneTransactionOne.categoryId &&
  transaction.account.id === oneTransactionOne.accountId &&
  transaction.trfAccount?.id === oneTransactionOne.trfAccountId &&
  transaction.refMerchant.id === oneTransactionOne.merchantId &&
  !oneTransactionOne.newMerchant &&
  transaction.date === oneTransactionOne.date &&
  transaction.description === oneTransactionOne.description &&
  checkAmount(transaction.amount, oneTransactionOne.amount) &&
  checkNecessaryRegular(transaction.regular, oneTransactionOne.regular) &&
  checkNecessaryRegular(transaction.necessary, oneTransactionOne.necessary);

const checkAmount = (amountStrNum: string, amountStr: string) =>
  amountStrNum.toString() === amountStr.toString();

const checkNecessaryRegular = (
  booleanValue: boolean | undefined,
  stringValue: string | undefined,
) =>
  (booleanValue === undefined &&
    (stringValue === undefined || stringValue === '')) ||
  (booleanValue === true && stringValue === 'YES') ||
  (booleanValue === false && stringValue === 'NO');

export const transactionsListNumberFormatter = (
  inputAmount: number,
  transactionTypeId: string,
  trfAccountId: string,
  selectedAccountId?: string,
): string => {
  let anotherInputAmount = 0;
  if (inputAmount && inputAmount > 0) {
    if (TRANSACTION_TYPE_ID_EXPENSE === transactionTypeId) {
      anotherInputAmount = inputAmount * -1;
    } else if (TRANSACTION_TYPE_ID_TRANSFER === transactionTypeId) {
      if (
        trfAccountId &&
        selectedAccountId &&
        trfAccountId === selectedAccountId
      ) {
        anotherInputAmount = inputAmount;
      } else {
        anotherInputAmount = inputAmount * -1;
      }
    } else {
      anotherInputAmount = inputAmount;
    }
  }

  return numberFormatter(anotherInputAmount);
};

export const filterTransactionTypeOptions = (
  transactionTypes: RefTransactionType[],
): SelectOptionProps[] => {
  const transactionTypesSelectOptions: SelectOptionProps[] = [
    { text: 'Please Select', value: '' },
  ];

  transactionTypes.forEach((type) =>
    transactionTypesSelectOptions.push({
      text: type.description,
      value: type.id,
    }),
  );

  return transactionTypesSelectOptions;
};

export const filterCategoryTypeOptions = (
  categoryTypes: RefCategoryType[],
): SelectOptionProps[] => {
  const categoryTypesSelectOptions: SelectOptionProps[] = [
    { text: 'Please Select', value: '' },
  ];

  categoryTypes.forEach((type) =>
    categoryTypesSelectOptions.push({
      text: type.description,
      value: type.id,
    }),
  );

  return categoryTypesSelectOptions;
};

export const filterCategoryOptions = (
  categories: RefCategory[],
  selectedCategoryType?: string,
): SelectOptionProps[] => {
  const categoriesSelectOptions: SelectOptionProps[] = [
    { text: 'Please Select', value: '' },
  ];

  if (selectedCategoryType) {
    categories = categories.filter((category) => {
      return category.refCategoryType.id === selectedCategoryType;
    });
  }

  categories.forEach((type) =>
    categoriesSelectOptions.push({
      text: type.description,
      value: type.id,
    }),
  );

  return categoriesSelectOptions;
};

export const filterAccountOptions = (
  accounts: Account[],
): SelectOptionProps[] => {
  const accountsSelectOptions: SelectOptionProps[] = [
    { text: 'Please Select', value: '' },
  ];

  accounts.forEach((account) =>
    accountsSelectOptions.push({
      text: account.description,
      value: account.id,
    }),
  );

  return accountsSelectOptions;
};

export const filterMerchantOptions = (
  merchants: Merchant[],
): SelectOptionProps[] => {
  const merchantSelectOptions: SelectOptionProps[] = [
    { text: 'Please Select', value: '' },
  ];

  merchants.forEach((merchant) =>
    merchantSelectOptions.push({
      text: merchant.description,
      value: merchant.id,
    }),
  );

  return merchantSelectOptions;
};

export const isTransactionFilterApplied = (
  transactionFilters: TransactionFilters,
): string | boolean | undefined =>
  transactionFilters &&
  (transactionFilters.accountId ||
    transactionFilters.categoryId ||
    transactionFilters.categoryTypeId ||
    transactionFilters.merchantId ||
    transactionFilters.transactionTypeId ||
    transactionFilters.txnAmountFromOnBlur ||
    transactionFilters.txnAmountToOnBlur ||
    transactionFilters.txnDateFromOnBlur ||
    transactionFilters.txnDateToOnBlur ||
    (transactionFilters.necessary && transactionFilters.necessary.length > 0) ||
    (transactionFilters.regular && transactionFilters.regular.length > 0));

export const getTransactionFilters = (
  name: string,
  value: string,
  transactionFilters: TransactionFilters,
): TransactionFilters => {
  switch (name) {
    case 'txnType':
      return setTransactionTypeFilter(value, transactionFilters);
    case 'catType':
      return setCategoryTypeFilter(value, transactionFilters);
    case 'cat':
      return setCategoryFilter(value, transactionFilters);
    case 'act':
      return setAccountFilter(value, transactionFilters);
    case 'mct':
      return setMerchantFilter(value, transactionFilters);
    case 'amtFrom':
      return setTxnAmountFromFilter(
        value,
        transactionFilters,
        value.trim().length > 0,
      );
    case 'amtTo':
      return setTxnAmountToFilter(
        value,
        transactionFilters,
        value.trim().length > 0,
      );
    case 'dateFrom':
      return setTxnDateFromFilter(
        value,
        transactionFilters,
        value.trim().length > 0,
      );
    case 'dateTo':
      return setTxnDateToFilter(
        value,
        transactionFilters,
        value.trim().length > 0,
      );
    case 'reg':
      return setRegularTxnsFilter(value, transactionFilters);
    case 'nec':
      return setNecessaryTxnsFilter(value, transactionFilters);
    default:
      return DefaultTransactionFilters;
  }
};

export const getTransactionFilter = (
  name: string,
  value: string,
  transactionFilters: TransactionFilters,
): TransactionFilters => {
  switch (name) {
    case 'amtFrom':
      return setTxnAmountFromFilter(value, transactionFilters, false);
    case 'amtTo':
      return setTxnAmountToFilter(value, transactionFilters, false);
    case 'dateFrom':
      return setTxnDateFromFilter(value, transactionFilters, false);
    case 'dateTo':
      return setTxnDateToFilter(value, transactionFilters, false);
    default:
      return DefaultTransactionFilters;
  }
};

const setTransactionTypeFilter = (
  value: string,
  transactionFilters: TransactionFilters,
): TransactionFilters => {
  return {
    ...transactionFilters,
    transactionTypeId: value,
  };
};

const setCategoryTypeFilter = (
  value: string,
  transactionFilters: TransactionFilters,
): TransactionFilters => {
  return {
    ...transactionFilters,
    categoryTypeId: value,
    categoryId: '',
  };
};

const setCategoryFilter = (
  value: string,
  transactionFilters: TransactionFilters,
): TransactionFilters => {
  return {
    ...transactionFilters,
    categoryId: value,
  };
};

const setAccountFilter = (
  value: string,
  transactionFilters: TransactionFilters,
): TransactionFilters => {
  return {
    ...transactionFilters,
    accountId: value,
  };
};

const setMerchantFilter = (
  value: string,
  transactionFilters: TransactionFilters,
): TransactionFilters => {
  return {
    ...transactionFilters,
    merchantId: value,
  };
};

const setTxnAmountFromFilter = (
  value: string,
  transactionFilters: TransactionFilters,
  txnAmountFromOnBlur: boolean,
): TransactionFilters => {
  return {
    ...transactionFilters,
    txnAmountFrom: value,
    txnAmountFromOnBlur,
  };
};

const setTxnAmountToFilter = (
  value: string,
  transactionFilters: TransactionFilters,
  txnAmountToOnBlur: boolean,
): TransactionFilters => {
  return {
    ...transactionFilters,
    txnAmountTo: value,
    txnAmountToOnBlur,
  };
};

const setTxnDateFromFilter = (
  value: string,
  transactionFilters: TransactionFilters,
  txnDateFromOnBlur: boolean,
): TransactionFilters => {
  return {
    ...transactionFilters,
    txnDateFrom: value,
    txnDateFromOnBlur,
  };
};

const setTxnDateToFilter = (
  value: string,
  transactionFilters: TransactionFilters,
  txnDateToOnBlur: boolean,
): TransactionFilters => {
  return {
    ...transactionFilters,
    txnDateTo: value,
    txnDateToOnBlur,
  };
};

const setRegularTxnsFilter = (
  value: string,
  transactionFilters: TransactionFilters,
) => {
  let newArray: string[];

  if (transactionFilters.regular.includes(value)) {
    newArray = transactionFilters.regular.filter(
      (oneValue) => oneValue !== value,
    );
  } else {
    // when Yes is checked, uncheck No, and vice-versa
    newArray = [value];
  }

  return {
    ...transactionFilters,
    regular: newArray,
  };
};

const setNecessaryTxnsFilter = (
  value: string,
  transactionFilters: TransactionFilters,
) => {
  let newArray: string[];

  if (transactionFilters.necessary.includes(value)) {
    newArray = transactionFilters.necessary.filter(
      (oneValue) => oneValue !== value,
    );
  } else {
    // when Yes is checked, uncheck No, and vice-versa
    newArray = [value];
  }

  return {
    ...transactionFilters,
    necessary: newArray,
  };
};
