/* eslint-disable @typescript-eslint/no-explicit-any */
import OneAccount from './OneAccount';
import { mount } from 'enzyme';
import { AuthContext } from '../../app/context/AuthContext';
import { getAuthSample } from '../../common/fixtures/authContext.sample.data';
import { ACCOUNTS_SAMPLE_DATA } from '../../common/fixtures/accounts.sample.data';
import { REF_ACCOUNT_TYPES, REF_BANKS } from '../../common/fixtures/refTypes.sample.data';
import { DefaultAccount } from '../types/accounts.data.types';
import * as accountUtils from '../utils/accounts.utils';

// This test class was added after updating to the latest dependencies which had breaking
// changes for react-router (v6) specially the inability to properly mock
// useParams method for test by test basis. So the tests which checked the bad account id
// and tests related to add buttons when there is no account id are moved here
// there's likely a better way to do this in the same test class, but I am tired of looking

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockUseNavigate,
  useParams: () => ({ id: ':id' }),
}));

describe('other one account tests', () => {
  const username = 'example86';
  const accountsList = ACCOUNTS_SAMPLE_DATA;

  const getTransactions = jest.fn();
  const resetOnPageLeave = jest.fn();
  const resetAlert = jest.fn();
  const setAlert = jest.fn();
  const updateAccount = jest.fn();
  const getAccounts = jest.fn();

  beforeEach(() => jest.resetAllMocks());

  const oneAccountProps = {
    error: '',
    success: '',
    accountsList: [],
    selectedAccount: DefaultAccount,
    selectedAccountTransactions: [],
    accountTypes: REF_ACCOUNT_TYPES,
    banks: REF_BANKS,
    getAccounts: jest.fn(),
    updateAccount: updateAccount,
    deleteAccount: jest.fn(),
    setAlert: setAlert,
    resetAlert: resetAlert,
    resetOnPageLeave: resetOnPageLeave,
    getTransactions: getTransactions,
    deleteTransaction: jest.fn(),
  };

  function renderOneAccount(customProps = {}) {
    const props = { ...oneAccountProps, ...customProps };

    return mount(
      <AuthContext.Provider value={getAuthSample()}>
        <OneAccount {...props} />
      </AuthContext.Provider>,
    );
  }

  describe('other calls made when the page is rendered', () => {
    it('does not call get accounts and transactions when account id is not valid', () => {
      renderOneAccount({});
      expect(getAccounts).not.toHaveBeenCalled();
      expect(getTransactions).not.toHaveBeenCalled();
    });
  });

  describe('other one account body content', () => {
    describe('other one account buttons', () => {
      describe('add and revert buttons', () => {
        it('buttons are displayed and disabled', () => {
          const output = renderOneAccount({
            accountsList,
          });

          expect(output.find('#one-account-button-add').at(0).prop('title')).toEqual('Add Account');
          expect(output.find('button[id="one-account-button-add"]').prop('disabled')).toBeTruthy();

          expect(output.find('#one-account-button-reset').at(0).prop('title')).toEqual('Revert Changes');
          expect(output.find('button[id="one-account-button-reset"]').prop('disabled')).toBeTruthy();
        });

        it('buttons are enabled when an input is updated', () => {
          const output = renderOneAccount({
            accountsList,
          });

          output.find('input[id="one-account-name-input"]').simulate('change', {
            target: { value: 'ACCOUNT CASH' },
          });

          expect(output.find('button[id="one-account-button-add"]').prop('disabled')).toBeFalsy();
          expect(output.find('button[id="one-account-button-reset"]').prop('disabled')).toBeFalsy();
        });

        describe('revert button actions', () => {
          it('resets input after change', () => {
            const output = renderOneAccount({
              accountsList,
            });

            expect(output.find('input[id="one-account-name-input"]').prop('value')).toEqual('');

            output.find('input[id="one-account-name-input"]').simulate('change', {
              target: { value: 'ACCOUNT CASH' },
            });

            expect(output.find('input[id="one-account-name-input"]').prop('value')).toEqual('ACCOUNT CASH');

            output.find('button[id="one-account-button-reset"]').simulate('click');

            expect(output.find('input[id="one-account-name-input"]').prop('value')).toEqual('');
          });
        });

        describe('add button actions', () => {
          it('calls validate and set alert if not valid', () => {
            const validateAccountSpy = jest.spyOn(accountUtils, 'validateAccount').mockReturnValue(' [Bank] ');

            const output = renderOneAccount({
              accountsList,
            });

            output.find('input[id="one-account-name-input"]').simulate('change', {
              target: { value: 'ACCOUNT CASH' },
            });

            output.find('button[id="one-account-button-add"]').simulate('click');

            expect(validateAccountSpy).toHaveBeenCalledTimes(1);
            expect(setAlert).toHaveBeenCalledTimes(1);
            expect(setAlert).toHaveBeenCalledWith(
              'failure',
              'Invalid Input! Required field  [Bank]  not provided!! Please Try Again!!!',
            );
          });

          it('calls made when changes are valid', () => {
            const validateAccountSpy = jest.spyOn(accountUtils, 'validateAccount').mockReturnValue('');

            const output = renderOneAccount({
              accountsList,
            });

            output.find('input[id="one-account-name-input"]').simulate('change', {
              target: { value: 'ACCOUNT CASH' },
            });

            output.find('button[id="one-account-button-add"]').simulate('click');

            const accountData = {
              ...DefaultAccount,
              description: 'ACCOUNT CASH',
            };

            expect(validateAccountSpy).toHaveBeenCalledTimes(1);
            expect(validateAccountSpy).toHaveBeenCalledWith(accountData);
            expect(setAlert).not.toHaveBeenCalled();
            expect(resetAlert).toHaveBeenCalledTimes(2); // updateAccountAction and showAllAccounts
            expect(resetOnPageLeave).toHaveBeenCalledTimes(1);
            expect(updateAccount).toHaveBeenCalledTimes(1);
            expect(updateAccount).toHaveBeenCalledWith(username, '', accountData, 'POST');
            expect(mockUseNavigate).toHaveBeenCalledTimes(1);
            expect(mockUseNavigate).toHaveBeenCalledWith('/accounts');
          });
        });
      });
    });
  });
});
