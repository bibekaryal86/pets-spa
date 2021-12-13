import { updateAccount } from './updateAccount.action';
import { prefetch } from '../../common/utils/prefetch';
import { ACCOUNTS_SAMPLE_DATA } from '../../common/fixtures/accounts.sample.data';
import {
  ACCOUNTS_COMPLETE,
  ACCOUNTS_EDIT_FAILURE,
  ACCOUNTS_EDIT_REQUEST,
  ACCOUNTS_EDIT_SUCCESS,
} from '../types/accounts.action.types';
import {
  MSG_KEY_EDIT_ACCOUNT_FAIL,
  MSG_KEY_EDIT_ACCOUNT_SUCCESS,
} from '../../common/utils/constants';

jest.mock('../../common/utils/prefetch');

describe('update account', () => {
  const username = 'user-name';
  const id = 'account-id';
  const account = {
    ...ACCOUNTS_SAMPLE_DATA[4],
    openingBalance: '-1.07',
    status: 'CLOSED',
  };
  const mockPrefetch = prefetch as jest.MockedFunction<typeof prefetch>;
  const dispatchSpy = jest.fn();

  const updateAccountsResponseSuccess = {
    accounts: [{ ...ACCOUNTS_SAMPLE_DATA[4], status: 'CLOSED' }],
  };

  const updateAccountsResponseFailure = {
    accounts: [],
    status: {
      errMsg: 'ERROR!!!',
    },
  };

  beforeEach(() => {
    mockPrefetch.mockReturnValue(updateAccountsResponseSuccess);
    process.env = { EDIT_ACCOUNT_ENDPOINT: 'www.edit-account-endpoint.com' };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('dispatches update account request', (done) => {
    updateAccount(
      username,
      id,
      account,
      'POST',
    )(dispatchSpy)
      .then(() =>
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_EDIT_REQUEST,
        }),
      )
      .then(done);
  });

  it('calls prefetch to update', (done) => {
    updateAccount(
      username,
      id,
      account,
      'PUT',
    )(dispatchSpy)
      .then(() =>
        expect(mockPrefetch).toHaveBeenLastCalledWith(
          'www.edit-account-endpoint.com',
          {
            method: 'PUT',
            pathParams: { username: 'user-name' },
            queryParams: { id: 'account-id' },
            requestBody: {
              bankId: '5ede4d790525eb78290332ee',
              description: 'CHASE-AMAZON',
              openingBalance: '1.07',
              status: 'CLOSED',
              typeId: '5ede4cf30525eb78290332e7',
              username: 'user-name',
            },
          },
        ),
      )
      .then(done);
  });

  it('dispatches update account success and finally complete', (done) => {
    updateAccount(
      username,
      id,
      account,
      'PUT',
    )(dispatchSpy)
      .then(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_EDIT_SUCCESS,
          success: MSG_KEY_EDIT_ACCOUNT_SUCCESS,
        });
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_COMPLETE,
        });
      })
      .then(done);
  });

  it('dispatches update account failure from prefetch response and finally complete', (done) => {
    mockPrefetch.mockReturnValue(updateAccountsResponseFailure);

    updateAccount(
      username,
      id,
      account,
      'PUT',
    )(dispatchSpy)
      .then(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_EDIT_FAILURE,
          error: 'ERROR!!!',
        });
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_COMPLETE,
        });
      })
      .then(done);
  });

  it('dispatches update account failure from exception caught and finally complete', (done) => {
    mockPrefetch.mockImplementation(() => Promise.reject(new Error('')));

    updateAccount(
      username,
      id,
      account,
      'PUT',
    )(dispatchSpy)
      .then(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_EDIT_FAILURE,
          error: MSG_KEY_EDIT_ACCOUNT_FAIL,
        });
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_COMPLETE,
        });
      })
      .then(done);
  });
});
