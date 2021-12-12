import {USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,} from '../types/home.action.types';
import {DefaultLoginResponse, UserLoginAction, UserLoginState,} from '../types/home.data.types';

const initialState: UserLoginState = {
    error: '',
    loginResponse: DefaultLoginResponse,
};

export default function login(
    state = initialState,
    action: UserLoginAction,
): UserLoginState {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
        case USER_LOGIN_FAILURE:
            return {
                error: action.error,
                loginResponse: DefaultLoginResponse,
            };
        case USER_LOGIN_SUCCESS:
            return {
                error: '',
                loginResponse: action.loginResponse,
            };
        default:
            return state;
    }
}
