import {
  Account,
  DefaultAccount,
} from '../../accounts/types/accounts.data.types';
import { Status } from '../../common/types/common.data.types';
import {
  RefCategory,
  RefTransactionType,
} from '../../common/types/refTypes.data.types';
import {
  DefaultUserDetails,
  UserDetails,
} from '../../home/types/home.data.types';
import {
  DefaultMerchant,
  Merchant,
} from '../../merchants/types/merchants.data.types';

export interface Transaction {
  id: string;
  description: string;
  account: Account;
  trfAccount: Account;
  refTransactionType: RefTransactionType;
  refCategory: RefCategory;
  refMerchant: Merchant;
  user: UserDetails;
  date: string;
  amount: string;
  regular?: boolean;
  necessary?: boolean;
}

export interface OneTransactionOne {
  id: string;
  description: string;
  accountId: string;
  trfAccountId: string;
  transactionTypeId: string;
  categoryTypeId: string;
  categoryId: string;
  merchantId: string;
  newMerchant: string;
  username: string;
  date: string;
  amount: string;
  regular?: string;
  necessary?: string;
}

export interface TransactionFilters {
  accountId: string;
  merchantId: string;
  transactionTypeId: string;
  categoryTypeId: string;
  categoryId: string;
  txnAmountFrom: string;
  txnAmountFromOnBlur: boolean;
  txnAmountTo: string;
  txnAmountToOnBlur: boolean;
  txnDateFrom: string;
  txnDateFromOnBlur: boolean;
  txnDateTo: string;
  txnDateToOnBlur: boolean;
  necessary: string[];
  regular: string[];
}

export interface TransactionsRequest {
  description: string;
  accountId: string;
  trfAccountId: string;
  typeId: string;
  categoryId: string;
  merchantId: string;
  newMerchant: string;
  username: string;
  date: string;
  amount: string;
  regular: boolean;
  necessary: boolean;
}

export interface TransactionsResponse {
  transactions: Transaction[];
  deleteCount: number;
  status: Status;
}

export interface TransactionsState {
  error: string;
  success: string;
  transactionsList: Transaction[];
  selectedTransaction: Transaction;
}

export interface TransactionsAction extends TransactionsState {
  type: string;
}

export interface TransactionsReducerState {
  displayTransactionsList: Transaction[];
  transactionFilters: TransactionFilters;
}

export interface TransactionsReducerAction extends TransactionsReducerState {
  type: string;
}

export interface OneTransactionValidationMessages {
  requiredFieldsMessages: string;
  txnTypeTransferMessages: string;
  otherMessages: string;
}

export const DefaultTransaction: Transaction = {
  id: '',
  description: '',
  account: DefaultAccount,
  trfAccount: DefaultAccount,
  refTransactionType: { id: '', description: '' },
  refCategory: {
    id: '',
    description: '',
    refCategoryType: { id: '', description: '' },
  },
  refMerchant: DefaultMerchant,
  user: DefaultUserDetails,
  date: '',
  amount: '',
};

export const DefaultTransactionsState: TransactionsState = {
  error: '',
  success: '',
  transactionsList: [],
  selectedTransaction: DefaultTransaction,
};

export const DefaultTransactionFilters: TransactionFilters = {
  accountId: '',
  merchantId: '',
  transactionTypeId: '',
  categoryTypeId: '',
  categoryId: '',
  txnAmountFrom: '',
  txnAmountFromOnBlur: false,
  txnAmountTo: '',
  txnAmountToOnBlur: false,
  txnDateFrom: '',
  txnDateFromOnBlur: false,
  txnDateTo: '',
  txnDateToOnBlur: false,
  necessary: [],
  regular: [],
};

export const DefaultTransactionsReducerState: TransactionsReducerState = {
  displayTransactionsList: [],
  transactionFilters: DefaultTransactionFilters,
};

export const DefaultOneTransactionOne: OneTransactionOne = {
  id: '',
  description: '',
  accountId: '',
  trfAccountId: '',
  transactionTypeId: '',
  categoryTypeId: '',
  categoryId: '',
  merchantId: '',
  newMerchant: '',
  username: '',
  date: '',
  amount: '',
};
