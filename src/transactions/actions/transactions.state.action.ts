import moment from 'moment';
import {GlobalDispatch} from '../../app/store/redux';
import {SESSION_TRANSACTION_FILTERS} from '../../common/utils/constants';
import {SessionStorage} from '../../common/utils/sessionStorageHelper';
import {
    TRANSACTIONS_RESET_FILTERS,
    TRANSACTIONS_SET_FILTER,
    TRANSACTIONS_SET_FILTERS,
    TRANSACTIONS_UNMOUNT,
} from '../types/transactions.action.types';
import {Transaction, TransactionFilters, TransactionsReducerAction,} from '../types/transactions.data.types';

export const resetOnPageLeave = () => {
    return async (dispatch: React.Dispatch<GlobalDispatch>): Promise<void> => {
        dispatch({
            type: TRANSACTIONS_UNMOUNT,
        });
    };
};

export const resetTransactionFilters =
    (): Partial<TransactionsReducerAction> => {
        SessionStorage.removeItems([SESSION_TRANSACTION_FILTERS]);

        return {
            type: TRANSACTIONS_RESET_FILTERS,
        };
    };

export const setTransactionFilter = (
    transactionFilters: TransactionFilters,
): Partial<TransactionsReducerAction> => {
    return {
        type: TRANSACTIONS_SET_FILTER,
        transactionFilters,
    };
};

export const setTransactionFilters = (
    transactionFilters: TransactionFilters,
    transactionsList: Transaction[],
): TransactionsReducerAction => {
    let displayTransactionsList: Transaction[] = transactionsList;

    if (transactionFilters.transactionTypeId) {
        displayTransactionsList = displayTransactionsList.filter(
            (transaction) =>
                transaction.refTransactionType.id ===
                transactionFilters.transactionTypeId,
        );
    }

    if (transactionFilters.categoryTypeId) {
        displayTransactionsList = displayTransactionsList.filter(
            (transaction) =>
                transaction.refCategory.refCategoryType.id ===
                transactionFilters.categoryTypeId,
        );
    }

    if (transactionFilters.categoryId) {
        displayTransactionsList = displayTransactionsList.filter(
            (transaction) =>
                transaction.refCategory.id === transactionFilters.categoryId,
        );
    }

    if (transactionFilters.accountId) {
        const filterWithAccounts = displayTransactionsList.filter(
            (transaction) => transaction.account.id === transactionFilters.accountId,
        );
        const filterWithTrfAccounts = displayTransactionsList.filter(
            (transaction) =>
                transaction.trfAccount?.id === transactionFilters.accountId,
        );
        displayTransactionsList = [...filterWithAccounts, ...filterWithTrfAccounts];
    }

    if (transactionFilters.merchantId) {
        displayTransactionsList = displayTransactionsList.filter(
            (transaction) =>
                transaction.refMerchant.id === transactionFilters.merchantId,
        );
    }

    if (transactionFilters.regular.length > 0) {
        const isRegular = transactionFilters.regular[0] === 'YES';
        displayTransactionsList = displayTransactionsList.filter(
            (transaction) => transaction.regular === isRegular,
        );
    }

    if (transactionFilters.necessary.length > 0) {
        const isNecessary = transactionFilters.necessary[0] === 'YES';
        displayTransactionsList = displayTransactionsList.filter(
            (transaction) => transaction.regular === isNecessary,
        );
    }

    if (transactionFilters.txnAmountFrom) {
        displayTransactionsList = displayTransactionsList.filter(
            (transaction) => transaction.amount >= transactionFilters.txnAmountFrom,
        );
    }

    if (transactionFilters.txnAmountTo) {
        displayTransactionsList = displayTransactionsList.filter(
            (transaction) => transaction.amount <= transactionFilters.txnAmountTo,
        );
    }

    if (transactionFilters.txnDateFrom) {
        displayTransactionsList = displayTransactionsList.filter((transaction) => {
            return moment(transaction.date).isSameOrAfter(
                moment(transactionFilters.txnDateFrom),
            );
        });
    }

    if (transactionFilters.txnDateTo) {
        displayTransactionsList = displayTransactionsList.filter((transaction) =>
            moment(transaction.date).isSameOrBefore(
                moment(transactionFilters.txnDateTo),
            ),
        );
    }

    SessionStorage.setItem(SESSION_TRANSACTION_FILTERS, transactionFilters);

    return {
        type: TRANSACTIONS_SET_FILTERS,
        displayTransactionsList,
        transactionFilters,
    };
};
