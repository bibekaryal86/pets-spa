import { connect } from 'react-redux';

import OneAccount from './OneAccount';
import { GlobalState } from '../../app/store/redux';
import { resetAlert, setAlert } from '../../common/utils/alerts';
import { deleteTransaction } from '../../transactions/actions/deleteTransaction.action';
import { getTransactions } from '../../transactions/actions/getTransactions.action';
import { TransactionFilters } from '../../transactions/types/transactions.data.types';
import { resetOnPageLeave } from '../actions/accounts.state.action';
import { deleteAccount } from '../actions/deleteAccount.action';
import { getAccounts } from '../actions/getAccounts.action';
import { updateAccount } from '../actions/updateAccount.action';
import { Account } from '../types/accounts.data.types';

const mapStateToProps = ({ accounts, refTypes }: GlobalState) => {
  return {
    error: accounts.error,
    success: accounts.success,
    accountsList: accounts.accountsList,
    selectedAccount: accounts.selectedAccount,
    selectedAccountTransactions: accounts.selectedAccountTransactions,
    accountTypes: refTypes.refAccountTypes,
    banks: refTypes.refBanks,
  };
};

const mapDispatchToProps = {
  getAccounts: (username: string, selectedAccountId: string) => getAccounts(username, selectedAccountId),
  updateAccount: (username: string, id: string, account: Account, method: string) =>
    updateAccount(username, id, account, method),
  deleteAccount: (username: string, id: string) => deleteAccount(username, id),
  setAlert: (type: string, messageKey: string) => setAlert(type, messageKey),
  resetAlert: () => resetAlert(),
  resetOnPageLeave: () => resetOnPageLeave(),
  getTransactions: (username: string, transactionFilters: Partial<TransactionFilters>) =>
    getTransactions(username, transactionFilters),
  deleteTransaction: (username: string, id: string) => deleteTransaction(username, id),
};

export default connect(mapStateToProps, mapDispatchToProps)(OneAccount);
