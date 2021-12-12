import {connect} from 'react-redux';
import {GlobalState} from '../../app/store/redux';
import {resetAlert, setAlert} from '../../common/utils/alerts';
import {deleteTransaction} from '../../transactions/actions/deleteTransaction.action';
import {getTransactions} from '../../transactions/actions/getTransactions.action';
import {TransactionFilters} from '../../transactions/types/transactions.data.types';
import {deleteMerchant} from '../actions/deleteMerchant.action';
import {getMerchants} from '../actions/getMerchants.action';
import {resetOnPageLeave} from '../actions/merchants.state.action';
import {updateMerchant} from '../actions/updateMerchant.action';
import OneMerchant from './OneMerchant';

const mapStateToProps = ({merchants}: GlobalState) => {
    return {
        error: merchants.error,
        success: merchants.success,
        merchantsList: merchants.merchantsList,
        selectedMerchant: merchants.selectedMerchant,
        selectedMerchantTransactions: merchants.selectedMerchantTransactions,
    };
};

const mapDispatchToProps = {
    getMerchants: (username: string, selectedMerchantId: string) =>
        getMerchants(username, selectedMerchantId),
    updateMerchant: (username: string, id: string, description: string) =>
        updateMerchant(username, id, description),
    deleteMerchant: (username: string, id: string) =>
        deleteMerchant(username, id),
    setAlert: (type: string, messageKey: string) => setAlert(type, messageKey),
    resetAlert: () => resetAlert(),
    resetOnPageLeave: () => resetOnPageLeave(),
    getTransactions: (
        username: string,
        transactionFilters: Partial<TransactionFilters>,
    ) => getTransactions(username, transactionFilters),
    deleteTransaction: (username: string, id: string) =>
        deleteTransaction(username, id),
};

export default connect(mapStateToProps, mapDispatchToProps)(OneMerchant);
