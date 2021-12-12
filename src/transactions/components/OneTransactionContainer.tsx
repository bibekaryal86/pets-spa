import {connect} from 'react-redux';
import {getAccounts} from '../../accounts/actions/getAccounts.action';
import {GlobalState} from '../../app/store/redux';
import {resetAlert, setAlert} from '../../common/utils/alerts';
import {getMerchants} from '../../merchants/actions/getMerchants.action';
import {deleteTransaction} from '../actions/deleteTransaction.action';
import {getTransactions} from '../actions/getTransactions.action';
import {resetOnPageLeave} from '../actions/transactions.state.action';
import {updateTransaction} from '../actions/updateTransaction.action';
import {TransactionsRequest} from '../types/transactions.data.types';
import OneTransaction from './OneTransaction';

const mapStateToProps = ({
                             accounts,
                             merchants,
                             refTypes,
                             transactions,
                         }: GlobalState) => {
    return {
        error: transactions.error,
        success: transactions.success,
        transactionsList: transactions.transactionsList,
        selectedTransaction: transactions.selectedTransaction,
        transactionTypes: refTypes.refTransactionTypes,
        categoryTypes: refTypes.refCategoryTypes,
        categories: refTypes.refCategories,
        accountsList: accounts.accountsList,
        merchantsList: merchants.merchantsList,
    };
};

const mapDispatchToProps = {
    getTransactions: (username: string, selectedTransactionId: string) =>
        getTransactions(username, undefined, selectedTransactionId),
    updateTransaction: (
        username: string,
        id: string,
        transactionsRequest: TransactionsRequest,
        method: string,
    ) => updateTransaction(username, id, transactionsRequest, method),
    deleteTransaction: (username: string, id: string) =>
        deleteTransaction(username, id),
    getAccounts: (username: string) => getAccounts(username),
    getMerchants: (username: string) => getMerchants(username),
    setAlert: (type: string, messageKey: string, messageBody?: JSX.Element) =>
        setAlert(type, messageKey, messageBody),
    resetAlert: () => resetAlert(),
    resetOnPageLeave: () => resetOnPageLeave(),
};

export default connect(mapStateToProps, mapDispatchToProps)(OneTransaction);
