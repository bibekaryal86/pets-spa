import { Status } from '../../common/types/common.data.types';
import { RefAccountType, RefBank } from '../../common/types/refTypes.data.types';
import { DefaultUserDetails, UserDetails } from '../../home/types/home.data.types';
import { Transaction } from '../../transactions/types/transactions.data.types';

export interface Account {
  id: string;
  description: string;
  openingBalance: string;
  currentBalance: string;
  status: string;
  refAccountType: RefAccountType;
  refBank: RefBank;
  user: UserDetails;
}

export interface AccountFilters {
  accountTypeId?: string;
  bankId?: string;
  status?: string | null;
}

export interface AccountsRequest {
  typeId: string;
  bankId: string;
  description: string;
  openingBalance: string;
  status: string;
  username: string;
}

export interface AccountsResponse {
  deleteCount: number;
  accounts: Account[];
  status: Status;
}

export interface AccountsState {
  error: string;
  success: string;
  accountsList: Account[];
  selectedAccount: Account;
  selectedAccountTransactions: Transaction[];
}

export interface AccountsAction extends AccountsState {
  type: string;
}

export interface AccountsReducerState {
  displayAccountsList: Account[];
  accountFilters: AccountFilters;
}

export interface AccountsReducerAction extends AccountsReducerState {
  type: string;
}

export interface OneAccountAction {
  account: Account;
}

export interface OneAccountUpdate {
  description: string;
  status: string;
  openingBalance: string;
  typeId: string;
  bankId: string;
}

export const DefaultAccount: Account = {
  id: '',
  description: '',
  openingBalance: '',
  currentBalance: '',
  status: '',
  refAccountType: {
    id: '',
    description: '',
  },
  refBank: {
    id: '',
    description: '',
  },
  user: DefaultUserDetails,
};

export const DefaultAccountsState: AccountsState = {
  error: '',
  success: '',
  accountsList: [],
  selectedAccount: DefaultAccount,
  selectedAccountTransactions: [],
};

export const DefaultAccountsReducerState: AccountsReducerState = {
  displayAccountsList: [],
  accountFilters: {},
};
