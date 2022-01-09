import { MSG_KEY_DELETE_ACCOUNT_FAIL, MSG_KEY_EDIT_ACCOUNT_SUCCESS } from '../../common/utils/constants';
import { prefetch } from '../../common/utils/prefetch';
import {
  ACCOUNTS_COMPLETE,
  ACCOUNTS_DELETE_FAILURE,
  ACCOUNTS_DELETE_REQUEST,
  ACCOUNTS_DELETE_SUCCESS,
} from '../types/accounts.action.types';
import { deleteAccount } from './deleteAccount.action';

jest.mock('../../common/utils/prefetch');

describe('delete account', () => {
  const username = 'user-name';
  const id = 'account-id';

  const mockPrefetch = prefetch as jest.MockedFunction<typeof prefetch>;
  const dispatchSpy = jest.fn();
  const deleteAccountResponseSuccess = {
    deleteCount: 1,
    accounts: [],
  };
  const deleteAccountResponseFailure = {
    deleteCount: 1,
    accounts: [],
    status: {
      errMsg: 'ERROR!!!',
    },
  };

  beforeEach(() => {
    mockPrefetch.mockReturnValue(deleteAccountResponseSuccess);
    process.env = { EDIT_ACCOUNT_ENDPOINT: 'www.edit-account-endpoint.com' };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('dispatches delete account request', (done) => {
    deleteAccount(
      username,
      id,
    )(dispatchSpy)
      .then(() =>
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_DELETE_REQUEST,
        }),
      )
      .then(done);
  });

  it('calls prefetch', (done) => {
    deleteAccount(
      username,
      id,
    )(dispatchSpy)
      .then(() =>
        expect(mockPrefetch).toHaveBeenCalledWith('www.edit-account-endpoint.com', {
          method: 'DELETE',
          pathParams: {
            username: 'user-name',
          },
          queryParams: {
            id: 'account-id',
          },
        }),
      )
      .then(done);
  });

  it('dispatches delete account success and finally complete', (done) => {
    deleteAccount(
      username,
      id,
    )(dispatchSpy)
      .then(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_DELETE_SUCCESS,
          success: MSG_KEY_EDIT_ACCOUNT_SUCCESS,
        });
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_COMPLETE,
        });
      })
      .then(done);
  });

  it('dispatches delete account failure from prefetch response and finally complete', (done) => {
    mockPrefetch.mockReturnValue(deleteAccountResponseFailure);

    deleteAccount(
      username,
      id,
    )(dispatchSpy)
      .then(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_DELETE_FAILURE,
          error: 'ERROR!!!',
        });
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_COMPLETE,
        });
      })
      .then(done);
  });

  it('dispatches delete account failure from exception caught and finally complete', (done) => {
    mockPrefetch.mockImplementation(() => Promise.reject(new Error('')));

    deleteAccount(
      username,
      id,
    )(dispatchSpy)
      .then(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_DELETE_FAILURE,
          error: MSG_KEY_DELETE_ACCOUNT_FAIL,
        });
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: ACCOUNTS_COMPLETE,
        });
      })
      .then(done);
  });
});
