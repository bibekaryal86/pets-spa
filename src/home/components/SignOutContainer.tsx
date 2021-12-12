import {connect} from 'react-redux';
import {userLogout} from '../actions/logout.action';
import SignOut from './SignOut';

const mapDispatchToProps = {
    userLogout: (token: string) => userLogout(token),
};

export default connect(null, mapDispatchToProps)(SignOut);
