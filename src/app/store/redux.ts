/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { composeWithDevTools } from 'redux-devtools-extension';
import login from '../../home/reducers/login.reducer';
import alert from '../../common/reducers/alert.reducer';
import prefetch from '../../common/reducers/prefetch.reducer';
import spinner from '../../common/reducers/spinner.reducer';
import refTypes from '../../common/reducers/refTypes.reducer';
import merchants from '../../merchants/reducers/merchants.reducer';
import accounts from '../../accounts/reducers/accounts.reducer';
import transactions from '../../transactions/reducers/transactions.reducer';
import { AlertState } from '../../common/utils/alerts';
import { PrefetchState } from '../../common/utils/prefetch';
import { SpinnerState } from '../../common/utils/spinner';
import { MerchantsState } from '../../merchants/types/merchants.data.types';
import { AccountsState } from '../../accounts/types/accounts.data.types';
import { TransactionsState } from '../../transactions/types/transactions.data.types';
import { RefTypesState } from '../../common/types/refTypes.data.types';
import { USER_LOGOUT } from '../../home/types/home.action.types';
import { UserLoginState } from '../../home/types/home.data.types';

// ACTIONS (ESP: FETCH ACTIONS) SHOULD BE NAMED IN THE FOLLOWING PATTERN:
// xxx_REQUEST, xxx_SUCCESS, xxx_FAILURE, xxx_COMPLETE
// see spinner.reducer.ts for reason

export interface GlobalState {
  login: UserLoginState;
  alert: AlertState;
  prefetch: PrefetchState;
  spinner: SpinnerState;
  refTypes: RefTypesState;
  merchants: MerchantsState;
  accounts: AccountsState;
  transactions: TransactionsState;
}

export interface GlobalDispatch {
  type: string;
}

const appReducers = combineReducers({
  login,
  alert,
  prefetch,
  spinner,
  refTypes,
  merchants,
  accounts,
  transactions,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }
  return appReducers(state, action);
};

const store =
  process.env.NODE_ENV === 'production'
    ? createStore(rootReducer, applyMiddleware(thunk))
    : createStore(
        rootReducer,
        composeWithDevTools(
          applyMiddleware(thunk, reduxImmutableStateInvariant()),
        ),
      );

export default store;
