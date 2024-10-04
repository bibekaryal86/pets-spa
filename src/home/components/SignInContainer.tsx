import { connect } from 'react-redux';

import SignIn from './SignIn';
import { GlobalState } from '../../app/store/redux';
import { resetAlert, setAlert } from '../../common/utils/alerts';
import { userLogin } from '../actions/login.action';

const mapStateToProps = ({ login }: GlobalState) => {
  return {
    error: login.error,
    loginResponse: login.loginResponse,
  };
};

const mapDispatchToProps = {
  userLogin: (username: string, password: string) => userLogin(username, password),
  setAlert: (type: string, messageKey: string) => setAlert(type, messageKey),
  resetAlert: () => resetAlert(),
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
