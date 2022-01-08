/* eslint-disable @typescript-eslint/no-explicit-any */
import OneAccount from './OneAccount';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { AuthContext } from '../../app/context/AuthContext';
import { getAuthSample } from '../../common/fixtures/authContext.sample.data';
import { ACCOUNTS_SAMPLE_DATA } from '../../common/fixtures/accounts.sample.data';
import { TRANSACTIONS_SAMPLE_DATA_BY_ACCOUNT } from '../../common/fixtures/transactions.sample.data';
import {
  REF_ACCOUNT_TYPES,
  REF_ACCOUNT_TYPES_SELECT_OPTIONS,
  REF_BANKS,
  REF_BANKS_SELECT_OPTIONS,
  REF_STATUS_SELECT_OPTIONS,
} from '../../common/fixtures/refTypes.sample.data';
import { Account, DefaultAccount } from '../types/accounts.data.types';
import { DefaultUserDetails } from '../../home/types/home.data.types';
import { DisplayCardBody } from '../../styles/styled.card.style';
import HrefLink from '../../common/forms/HrefLink';
import { InputType } from '../../common/forms/Input';
import Button from '../../common/forms/Button';
import TransactionsList from '../../transactions/components/TransactionsList';
import * as accountUtils from '../utils/accounts.utils';

const mockAccountId = '5ede97c32c473171d746458e';
const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockUseNavigate,
  useParams: () => ({ id: mockAccountId }),
}));

describe('one account tests', () => {
  const username = 'example86';

  const getAccounts = jest.fn();
  const updateAccount = jest.fn();
  const deleteAccount = jest.fn();
  const setAlert = jest.fn();
  const resetAlert = jest.fn();
  const resetOnPageLeave = jest.fn();
  const getTransactions = jest.fn();
  const deleteTransaction = jest.fn();

  beforeEach(() => jest.resetAllMocks());

  const selectedAccount: Account = {
    id: mockAccountId,
    description: 'ACCOUNT CASH',
    openingBalance: '11',
    currentBalance: '21',
    status: 'ACTIVE',
    refAccountType: {
      id: '5ede4cbb0525eb78290332e4',
      description: 'ACCOUNT CASH',
    },
    refBank: {
      id: '5ede4d510525eb78290332eb',
      description: 'BANK CASH',
    },
    user: {
      ...DefaultUserDetails,
      username,
    },
  };

  const accountsList = ACCOUNTS_SAMPLE_DATA;
  const selectedAccountTransactions = TRANSACTIONS_SAMPLE_DATA_BY_ACCOUNT;

  const oneAccountProps = {
    error: '',
    success: '',
    accountsList: [],
    selectedAccount: DefaultAccount,
    selectedAccountTransactions: [],
    accountTypes: REF_ACCOUNT_TYPES,
    banks: REF_BANKS,
    getAccounts,
    updateAccount,
    deleteAccount,
    setAlert,
    resetAlert,
    resetOnPageLeave,
    getTransactions,
    deleteTransaction,
  };

  function renderOneAccount(customProps = {}) {
    const props = { ...oneAccountProps, ...customProps };

    return mount(
      <AuthContext.Provider value={getAuthSample()}>
        <OneAccount {...props} />
      </AuthContext.Provider>,
    );
  }

  describe('render', () => {
    it('matches snapshot', () => {
      const output = renderOneAccount({
        accountsList,
        selectedAccount,
        selectedAccountTransactions,
      });
      expect(toJson(output)).toMatchSnapshot();
    });
  });

  describe('calls made when the page is rendered', () => {
    it('calls get accounts when account id is valid', () => {
      renderOneAccount({});
      expect(getAccounts).toHaveBeenCalledWith(username, mockAccountId);
    });

    it('calls get transactions when account id is valid', () => {
      renderOneAccount({});
      expect(getTransactions).toHaveBeenCalledWith(username, {
        accountId: mockAccountId,
      });
    });
  });

  describe('alerts messages', () => {
    it('calls set alert when there is an error message', () => {
      renderOneAccount({
        error: 'this-is-error',
      });
      expect(setAlert).toHaveBeenCalledWith('failure', 'this-is-error');
    });

    it('calls set alert when there is a success message', () => {
      renderOneAccount({
        success: 'this-is-success',
      });
      expect(setAlert).toHaveBeenCalledWith('success', 'this-is-success');
    });

    it('calls reset alert when leaving the page', () => {
      const output = renderOneAccount({});
      // clear mocks to have a clean check
      jest.resetAllMocks();
      output.unmount();
      // check mocks after unmount
      expect(resetAlert).toHaveBeenCalled();
      expect(resetOnPageLeave).toHaveBeenCalled();
    });
  });

  describe('one account header', () => {
    const headerBodyWrapper = renderOneAccount({ selectedAccount }).find(
      '#one-account-body-header',
    );

    it('header background color', () => {
      const headerBody = headerBodyWrapper.find(DisplayCardBody);
      expect(headerBody.prop('background')).toEqual('darkseagreen');
    });

    it('header text', () => {
      const headerText = headerBodyWrapper.find('h4');
      expect(headerText.text()).toEqual('Account Details: ACCOUNT CASH');
    });

    it('header link to all accounts', () => {
      const hrefLink = headerBodyWrapper.find(HrefLink);
      expect(hrefLink.prop('linkTo')).toEqual('#');
      expect(hrefLink.prop('title')).toEqual('To All Accounts List');

      const ahref = headerBodyWrapper
        .find('#one-account-all-accounts-link-1')
        .at(0);
      expect(ahref.text()).toEqual('To All Accounts List');

      ahref.simulate('click');
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
      expect(mockUseNavigate).toHaveBeenCalledWith('/accounts');
    });
  });

  describe('one account body content', () => {
    describe('one account input form', () => {
      it('account name input', () => {
        const output = renderOneAccount({
          accountsList,
          selectedAccount,
          selectedAccountTransactions,
        });

        const accountNameInput = output.find('#one-account-name-input').at(0);

        expect(accountNameInput.prop('label')).toEqual('Account Name');
        expect(accountNameInput.prop('value')).toEqual('ACCOUNT CASH');
        expect(accountNameInput.prop('maxLength')).toEqual(25);
        expect(accountNameInput.prop('required')).toEqual(true);

        // before change
        expect(
          output.find('input[id="one-account-name-input"]').prop('value'),
        ).toEqual('ACCOUNT CASH');

        // change
        accountNameInput.find('input').simulate('change', {
          target: { value: 'CASH ACCOUNT' },
        });

        // after change
        expect(
          output.find('input[id="one-account-name-input"]').prop('value'),
        ).toEqual('CASH ACCOUNT');
      });

      it('opening balance input', () => {
        const output = renderOneAccount({
          accountsList,
          selectedAccount,
          selectedAccountTransactions,
        });
        const openingBalanceInput = output
          .find('#one-account-opening-balance-input')
          .at(0);

        expect(openingBalanceInput.prop('label')).toEqual(
          'Opening Balance (USD)',
        );
        expect(openingBalanceInput.prop('value')).toEqual('11');
        expect(openingBalanceInput.prop('maxLength')).toEqual(10);
        expect(openingBalanceInput.prop('type')).toEqual(InputType.number);
        expect(openingBalanceInput.prop('required')).toEqual(true);

        // before change
        expect(
          output
            .find('input[id="one-account-opening-balance-input"]')
            .prop('value'),
        ).toEqual('11');

        // change
        output
          .find('input[id="one-account-opening-balance-input"]')
          .simulate('change', {
            target: { value: '12' },
          });

        // after change
        expect(
          output
            .find('input[id="one-account-opening-balance-input"]')
            .prop('value'),
        ).toEqual('12');
      });

      it('current balance input', () => {
        const output = renderOneAccount({
          accountsList,
          selectedAccount,
          selectedAccountTransactions,
        });
        const currentBalanceInput = output
          .find('#one-account-current-balance-input')
          .at(0);

        expect(currentBalanceInput.prop('label')).toEqual(
          'Current Balance (USD)',
        );
        expect(currentBalanceInput.prop('value')).toEqual('21');
        expect(currentBalanceInput.prop('disabled')).toEqual(true);

        expect(
          currentBalanceInput.find('input').props()['disabled'],
        ).toBeTruthy();
      });

      it('account type select', () => {
        const output = renderOneAccount({
          accountsList,
          selectedAccount,
          selectedAccountTransactions,
        });
        const accountTypeSelect = output.find('#one-account-type-select').at(0);

        expect(accountTypeSelect.prop('label')).toEqual('Account Type');
        expect(accountTypeSelect.prop('value')).toEqual(
          REF_ACCOUNT_TYPES[0].id,
        );
        expect(accountTypeSelect.prop('required')).toEqual(true);
        expect(accountTypeSelect.prop('options')).toEqual(
          REF_ACCOUNT_TYPES_SELECT_OPTIONS,
        );

        // before change
        expect(
          output.find('select[id="one-account-type-select"]').prop('value'),
        ).toEqual(REF_ACCOUNT_TYPES[0].id);

        // change
        accountTypeSelect.find('select').simulate('change', {
          target: { value: REF_ACCOUNT_TYPES[1].id },
        });

        // after change
        expect(
          output.find('select[id="one-account-type-select"]').prop('value'),
        ).toEqual(REF_ACCOUNT_TYPES[1].id);
      });

      it('bank select', () => {
        const output = renderOneAccount({
          accountsList,
          selectedAccount,
          selectedAccountTransactions,
        });
        const bankSelect = output.find('#one-account-bank-select').at(0);

        expect(bankSelect.prop('label')).toEqual('Bank Name');
        expect(bankSelect.prop('value')).toEqual(REF_BANKS[1].id);
        expect(bankSelect.prop('required')).toEqual(true);
        expect(bankSelect.prop('options')).toEqual(REF_BANKS_SELECT_OPTIONS);

        // before change
        expect(
          output.find('select[id="one-account-bank-select"]').prop('value'),
        ).toEqual(REF_BANKS[1].id);

        // change
        bankSelect.find('select').simulate('change', {
          target: { value: REF_BANKS[2].id },
        });

        // after change
        expect(
          output.find('select[id="one-account-bank-select"]').prop('value'),
        ).toEqual(REF_BANKS[2].id);
      });

      it('account status select', () => {
        const output = renderOneAccount({
          accountsList,
          selectedAccount,
          selectedAccountTransactions,
        });
        const accountStatusSelect = output
          .find('#one-account-status-select')
          .at(0);

        expect(accountStatusSelect.prop('label')).toEqual('Account Status');
        expect(accountStatusSelect.prop('value')).toEqual(
          REF_STATUS_SELECT_OPTIONS[1].value,
        );
        expect(accountStatusSelect.prop('required')).toEqual(true);
        expect(accountStatusSelect.prop('options')).toEqual(
          REF_STATUS_SELECT_OPTIONS,
        );

        // before change
        expect(
          output.find('select[id="one-account-status-select"]').prop('value'),
        ).toEqual(REF_STATUS_SELECT_OPTIONS[1].value);

        // change
        accountStatusSelect.find('select').simulate('change', {
          target: { value: REF_STATUS_SELECT_OPTIONS[2].value },
        });

        // after change
        expect(
          output.find('select[id="one-account-status-select"]').prop('value'),
        ).toEqual(REF_STATUS_SELECT_OPTIONS[2].value);
      });
    });

    describe('one account buttons', () => {
      describe('update, delete and revert buttons', () => {
        it('buttons are displayed and disabled', () => {
          const output = renderOneAccount({
            accountsList,
            selectedAccount,
          });
          const buttons = output.find(Button);
          expect(buttons.length).toEqual(3);

          expect(
            output.find('#one-account-button-update').at(0).prop('title'),
          ).toEqual('Update Account');
          expect(
            output
              .find('button[id="one-account-button-update"]')
              .prop('disabled'),
          ).toBeTruthy();

          expect(
            output.find('#one-account-button-delete').at(0).prop('title'),
          ).toEqual('Delete Account');
          expect(
            output
              .find('button[id="one-account-button-delete"]')
              .prop('disabled'),
          ).toBeFalsy();

          expect(
            output.find('#one-account-button-reset').at(0).prop('title'),
          ).toEqual('Revert Changes');
          expect(
            output
              .find('button[id="one-account-button-reset"]')
              .prop('disabled'),
          ).toBeTruthy();
        });

        it('buttons are enabled when an input is updated', () => {
          const output = renderOneAccount({
            accountsList,
            selectedAccount,
          });

          output.find('input[id="one-account-name-input"]').simulate('change', {
            target: { value: 'CASH ACCOUNT' },
          });

          expect(
            output
              .find('button[id="one-account-button-update"]')
              .prop('disabled'),
          ).toBeFalsy();
          expect(
            output
              .find('button[id="one-account-button-reset"]')
              .prop('disabled'),
          ).toBeFalsy();
        });

        describe('revert button actions', () => {
          it('resets input after change', () => {
            const output = renderOneAccount({
              accountsList,
              selectedAccount,
            });

            expect(
              output.find('input[id="one-account-name-input"]').prop('value'),
            ).toEqual('ACCOUNT CASH');

            output
              .find('input[id="one-account-name-input"]')
              .simulate('change', {
                target: { value: 'CASH ACCOUNT' },
              });

            expect(
              output.find('input[id="one-account-name-input"]').prop('value'),
            ).toEqual('CASH ACCOUNT');

            output
              .find('button[id="one-account-button-reset"]')
              .simulate('click');

            expect(
              output.find('input[id="one-account-name-input"]').prop('value'),
            ).toEqual('ACCOUNT CASH');
          });
        });

        describe('update button actions', () => {
          it('calls validate and set alert if not valid', () => {
            const validateAccountSpy = jest
              .spyOn(accountUtils, 'validateAccount')
              .mockReturnValue(' [ACCOUNT NAME] ');

            const output = renderOneAccount({
              accountsList,
              selectedAccount,
            });

            output
              .find('input[id="one-account-name-input"]')
              .simulate('change', {
                target: { value: '' },
              });

            output
              .find('button[id="one-account-button-update"]')
              .simulate('click');

            expect(validateAccountSpy).toHaveBeenCalledTimes(1);
            expect(setAlert).toHaveBeenCalledTimes(1);
            expect(setAlert).toHaveBeenCalledWith(
              'failure',
              'Invalid Input! Required field  [ACCOUNT NAME]  not provided!! Please Try Again!!!',
            );
          });

          it('calls made when changes are valid', () => {
            const validateAccountSpy = jest
              .spyOn(accountUtils, 'validateAccount')
              .mockReturnValue('');

            const output = renderOneAccount({
              accountsList,
              selectedAccount,
            });

            output
              .find('input[id="one-account-name-input"]')
              .simulate('change', {
                target: { value: 'CASH ACCOUNT' },
              });

            output
              .find('button[id="one-account-button-update"]')
              .simulate('click');

            const accountData = {
              ...selectedAccount,
              description: 'CASH ACCOUNT',
            };

            expect(validateAccountSpy).toHaveBeenCalledTimes(1);
            expect(validateAccountSpy).toHaveBeenCalledWith(accountData);
            expect(setAlert).not.toHaveBeenCalled();
            expect(resetAlert).toHaveBeenCalledTimes(1);
            expect(resetOnPageLeave).not.toHaveBeenCalled();
            expect(mockUseNavigate).not.toHaveBeenCalled();
            expect(updateAccount).toHaveBeenCalledTimes(1);
            expect(updateAccount).toHaveBeenCalledWith(
              username,
              mockAccountId,
              accountData,
              'PUT',
            );
          });
        });

        describe('delete button', () => {
          it('button is always enabled', () => {
            const output = renderOneAccount({
              accountsList,
              selectedAccount,
            });

            const deleteButton = output.find(
              'button[id="one-account-button-delete"]',
            );

            expect(deleteButton.prop('disabled')).toBeFalsy();
          });

          it('opens modal when button is clicked', () => {
            document.getElementById = jest
              .fn()
              .mockImplementation((id) =>
                id === 'app-modal' ? document.createElement('div') : null,
              );
            const output = renderOneAccount({
              accountsList,
              selectedAccount,
            });

            const modalBeforeClick = output.find('#app-modal-id');
            expect(modalBeforeClick.length).toEqual(0);

            output
              .find('button[id="one-account-button-delete"]')
              .simulate('click');

            const modalAfterClick = output.find('#app-modal-id');
            expect(modalAfterClick.length).toEqual(1);

            // modal body content
            const content = output.find('#app-modal-id').find('.modal-content');
            expect(content.text()).toContain(
              `Are you sure you want to delete the account: ${selectedAccount.description}?`,
            );

            // modal secondary button
            const secondaryButton = output
              .find('#app-modal-id')
              .find('button[id="modal-secondary-button"]');
            expect(secondaryButton.text()).toEqual('Cancel');
            secondaryButton.simulate('click');
            // modal is closed
            const modalAfterClick_secondayButton = output.find('#app-modal-id');
            expect(modalAfterClick_secondayButton.length).toEqual(0);

            // click delete button to open modal again
            output
              .find('button[id="one-account-button-delete"]')
              .simulate('click');

            // modal primary button
            const primaryButton = output
              .find('#app-modal-id')
              .find('button[id="modal-primary-button"]');
            expect(primaryButton.text()).toEqual('Yes');
            primaryButton.simulate('click');
            // modal is closed
            const modalAfterClick_primaryButton = output.find('#app-modal-id');
            expect(modalAfterClick_primaryButton.length).toEqual(0);
            // calls are made
            expect(resetAlert).toHaveBeenCalledTimes(1);
            expect(resetOnPageLeave).toHaveBeenCalledTimes(1);
            expect(deleteAccount).toHaveBeenCalledTimes(1);
            expect(deleteAccount).toHaveBeenCalledWith(
              username,
              selectedAccount.id,
            );
            expect(mockUseNavigate).toHaveBeenCalledTimes(1);
            expect(mockUseNavigate).toHaveBeenCalledWith('/accounts');
          });
        });
      });
    });

    describe('one account links banner', () => {
      const output = renderOneAccount({
        accountsList,
        selectedAccount,
        selectedAccountTransactions,
      });

      it('link to all accounts', () => {
        const linkToAllAccounts = output
          .find('#one-account-all-accounts-link-2')
          .at(0);
        expect(linkToAllAccounts.text()).toEqual(' [ Show All Accounts ] ');
        linkToAllAccounts.simulate('click');
        expect(mockUseNavigate).toHaveBeenCalledWith('/accounts');
      });

      it('link to add new transaction', () => {
        const linkToAllAccounts = output
          .find('#one-account-add-txn-link')
          .at(0);
        expect(linkToAllAccounts.text()).toEqual(' [ Add New Transaction ] ');
        linkToAllAccounts.simulate('click');
        expect(mockUseNavigate).toHaveBeenCalledWith(
          '/transaction/?accountId=' + ACCOUNTS_SAMPLE_DATA[0].id,
        );
      });

      it('link to show all transactions', () => {
        const linkToAllAccounts = output
          .find('#one-account-all-txns-link')
          .at(0);
        expect(linkToAllAccounts.text()).toEqual(' [ Show All Transactions ] ');
        linkToAllAccounts.simulate('click');
        expect(mockUseNavigate).toHaveBeenCalledWith('/transactions');
      });
    });

    describe('show transactions for the account', () => {
      const output = renderOneAccount({
        accountsList,
        selectedAccount,
        selectedAccountTransactions,
      });

      it('transactions for selected account', () => {
        const transactions = output.find(TransactionsList);
        expect(transactions.prop('transactions')).toEqual(
          selectedAccountTransactions,
        );
        expect(transactions.prop('selectedAccountId')).toEqual(
          ACCOUNTS_SAMPLE_DATA[0].id,
        );
      });
    });
  });
});
