import {Status} from '../../common/types/common.data.types';
import {DefaultUserDetails, UserDetails,} from '../../home/types/home.data.types';
import {Transaction} from '../../transactions/types/transactions.data.types';

export interface Merchant {
    id: string;
    description: string;
    notEditable: boolean;
    user: UserDetails;
}

export interface MerchantsResponse {
    deleteCount: number;
    refMerchants: Merchant[];
    refMerchantsFilterList: string[];
    refMerchantsNotUsedInTransactions: Merchant[];
    status: Status;
}

export interface MerchantsRequest {
    description: string;
    username: string;
}

export interface MerchantFilters {
    firstChar?: string;
    notUsedInTransactionsOnly?: boolean;
}

export interface MerchantsState {
    error: string;
    success: string;
    merchantsList: Merchant[];
    merchantsFiltersList: string[];
    merchantsNotUsedInTxnsList: Merchant[];
    selectedMerchant: Merchant;
    selectedMerchantTransactions: Transaction[];
}

export interface MerchantsAction extends MerchantsState {
    type: string;
}

export interface MerchantsReducerState {
    displayMerchantsList: Merchant[];
    merchantInActionId: string;
    merchantInActionDesc: string;
    merchantNameBeginsWith: string;
    showNotUsedInTxnsOnly: boolean;
    isDeleteModalOpen: boolean;
    isUpdateModalOpen: boolean;
    modalInput: string;
}

export interface MerchantsReducerAction extends MerchantsReducerState {
    type: string;
}

export const DefaultMerchant: Merchant = {
    id: '',
    description: '',
    notEditable: true,
    user: DefaultUserDetails,
};

export const DefaultMerchantsState: MerchantsState = {
    error: '',
    success: '',
    merchantsList: [],
    merchantsFiltersList: [],
    merchantsNotUsedInTxnsList: [],
    selectedMerchant: DefaultMerchant,
    selectedMerchantTransactions: [],
};

export const DefaultMerchantsReducerState: MerchantsReducerState = {
    displayMerchantsList: [],
    merchantInActionId: '',
    merchantInActionDesc: '',
    merchantNameBeginsWith: '',
    showNotUsedInTxnsOnly: false,
    isDeleteModalOpen: false,
    isUpdateModalOpen: false,
    modalInput: '',
};
