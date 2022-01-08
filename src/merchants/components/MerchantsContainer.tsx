import { connect } from 'react-redux';
import { GlobalState } from '../../app/store/redux';
import { resetAlert, setAlert } from '../../common/utils/alerts';
import { deleteMerchant } from '../actions/deleteMerchant.action';
import { getMerchants } from '../actions/getMerchants.action';
import { resetOnPageLeave } from '../actions/merchants.state.action';
import { updateMerchant } from '../actions/updateMerchant.action';
import Merchants from './Merchants';

const mapStateToProps = ({ merchants }: GlobalState) => {
  return {
    error: merchants.error,
    success: merchants.success,
    merchantsList: merchants.merchantsList,
    merchantsFiltersList: merchants.merchantsFiltersList,
    merchantsNotUsedInTxnsList: merchants.merchantsNotUsedInTxnsList,
  };
};

const mapDispatchToProps = {
  getMerchants: (username: string) => getMerchants(username),
  updateMerchant: (username: string, id: string, description: string) => updateMerchant(username, id, description),
  deleteMerchant: (username: string, id: string) => deleteMerchant(username, id),
  setAlert: (type: string, messageKey: string) => setAlert(type, messageKey),
  resetAlert: () => resetAlert(),
  resetOnPageLeave: () => resetOnPageLeave(),
};

export default connect(mapStateToProps, mapDispatchToProps)(Merchants);
