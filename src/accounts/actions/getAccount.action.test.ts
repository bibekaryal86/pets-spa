import { getAccounts } from './getAccounts.action';
import { prefetch } from '../../common/utils/prefetch';
import { ACCOUNTS_SAMPLE_DATA } from '../../common/fixtures/accounts.sample.data';
import {
  ACCOUNTS_COMPLETE,
  ACCOUNTS_GET_FAILURE,
  ACCOUNTS_GET_REQUEST,
  ACCOUNTS_GET_SUCCESS,
  ACCOUNTS_SELECT_ACCOUNT,
} from '../types/accounts.action.types';
import { MSG_KEY_GET_ACCOUNT_FAIL } from '../../common/utils/constants';

jest.mock('../../common/utils/prefetch');

describe('get account', () => {
  const username = 'user-name';
  const selectedAccountId = '5ede97c32c473171d746458e';
  const mockPrefetch = prefetch as jest.MockedFunction<typeof prefetch>;
  let dispatchSpy = jest.fn();
  let getStoreSpyEmpty = jest.fn();
  let getStoreSpyWithAccounts = jest.fn();

  const getAccountsResponseSuccess = {
    accounts: ACCOUNTS_SAMPLE_DATA,
  };

  const getAccountsFromStore = {
    accountsList: ACCOUNTS_SAMPLE_DATA.filter((account) => account.refAccountType.id === '5ede4cf30525eb78290332e7'),
  };

  const getAccountsResponseFailure = {
    accounts: [],
    status: {
      errMsg: 'ERROR!!!',
    },
  };

  const storeEmptyAccounts = {
    accounts: {
      accountsList: [],
    },
  };

  const storeWithAccounts = {
    accounts: getAccountsFromStore,
  };

  beforeEach(() => {
    mockPrefetch.mockReturnValue(getAccountsResponseSuccess);
    process.env = { GET_ACCOUNTS_ENDPOINT: 'www.get-account-endpoint.com' };
    dispatchSpy = jest.fn();
    getStoreSpyEmpty = jest.fn().mockReturnValue(storeEmptyAccounts);
    getStoreSpyWithAccounts = jest.fn().mockReturnValue(storeWithAccounts);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('dispatches get account request', (done) => {
    getAccounts(username)(dispatchSpy, getStoreSpyEmpty)
      .then(() =>
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_GET_REQUEST,
        }),
      )
      .then(done);
  });

  it('calls prefetch when no accounts in store', (done) => {
    getAccounts(username)(dispatchSpy, getStoreSpyEmpty)
      .then(() =>
        expect(mockPrefetch).toHaveBeenCalledWith('www.get-account-endpoint.com', {
          method: 'POST',
          pathParams: {
            username: 'user-name',
          },
          requestBody: null,
        }),
      )
      .then(done);
  });

  it('does not call prefetch when accounts in store', (done) => {
    getAccounts(username)(dispatchSpy, getStoreSpyWithAccounts)
      .then(() => expect(mockPrefetch).toHaveBeenCalledTimes(0))
      .then(done);
  });

  it('calls prefetch even when accounts in store, if fetchCall true in request', (done) => {
    getAccounts(
      username,
      undefined,
      undefined,
      true,
    )(dispatchSpy, getStoreSpyWithAccounts)
      .then(() =>
        expect(mockPrefetch).toHaveBeenCalledWith('www.get-account-endpoint.com', {
          method: 'POST',
          pathParams: {
            username: 'user-name',
          },
          requestBody: null,
        }),
      )
      .then(done);
  });

  it('dispatches get account success with accounts response from prefetch and finally complete', (done) => {
    getAccounts(username)(dispatchSpy, getStoreSpyEmpty)
      .then(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_GET_SUCCESS,
          accountsList: ACCOUNTS_SAMPLE_DATA,
        });
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_COMPLETE,
        });
      })
      .then(done);
  });

  it('dispatches get account success with accounts from store and finally complete', (done) => {
    getAccounts(username)(dispatchSpy, getStoreSpyWithAccounts)
      .then(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_GET_SUCCESS,
          accountsList: getAccountsFromStore.accountsList,
        });
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_COMPLETE,
        });
      })
      .then(done);
  });

  it('dispatches get account failure from prefetch response and finally complete', (done) => {
    mockPrefetch.mockReturnValue(getAccountsResponseFailure);

    getAccounts(username)(dispatchSpy, getStoreSpyEmpty)
      .then(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_GET_FAILURE,
          error: 'ERROR!!!',
        });
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_COMPLETE,
        });
      })
      .then(done);
  });

  it('dispatches get account failure from exception caught and finally complete', (done) => {
    mockPrefetch.mockImplementation(() => Promise.reject(new Error('')));

    getAccounts(username)(dispatchSpy, getStoreSpyEmpty)
      .then(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_GET_FAILURE,
          error: MSG_KEY_GET_ACCOUNT_FAIL,
        });
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_COMPLETE,
        });
      })
      .then(done);
  });

  it('sets selected account', (done) => {
    getAccounts(username, selectedAccountId)(dispatchSpy, getStoreSpyEmpty)
      .then(() =>
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_SELECT_ACCOUNT,
          selectedAccount: ACCOUNTS_SAMPLE_DATA[0],
          error: '',
          success: '',
          accountsList: [],
          selectedAccountTransactions: [],
        }),
      )
      .then(done);
  });
});
