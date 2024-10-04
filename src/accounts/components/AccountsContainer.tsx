import { connect } from 'react-redux';

import Accounts from './Accounts';
import { GlobalState } from '../../app/store/redux';
import { resetAlert, setAlert } from '../../common/utils/alerts';
import { resetOnPageLeave } from '../actions/accounts.state.action';
import { getAccounts } from '../actions/getAccounts.action';

const mapStateToProps = ({ accounts, refTypes }: GlobalState) => {
  return {
    error: accounts.error,
    success: accounts.success,
    accountsList: accounts.accountsList,
    accountTypes: refTypes.refAccountTypes,
    banks: refTypes.refBanks,
  };
};

const mapDispatchToProps = {
  getAccounts: (username: string) => getAccounts(username),
  setAlert: (type: string, messageKey: string) => setAlert(type, messageKey),
  resetAlert: () => resetAlert(),
  resetOnPageLeave: () => resetOnPageLeave(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
