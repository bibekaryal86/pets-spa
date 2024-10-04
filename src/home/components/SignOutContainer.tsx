import { connect } from 'react-redux';

import SignOut from './SignOut';
import { userLogout } from '../actions/logout.action';

const mapDispatchToProps = {
  userLogout: (token: string) => userLogout(token),
};

export default connect(null, mapDispatchToProps)(SignOut);
