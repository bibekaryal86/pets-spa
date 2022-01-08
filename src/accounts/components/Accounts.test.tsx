/* eslint-disable @typescript-eslint/no-explicit-any */
import Accounts from './Accounts';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { AuthContext } from '../../app/context/AuthContext';
import { getAuthSample } from '../../common/fixtures/authContext.sample.data';
import * as accountsStateAction from '../actions/accounts.state.action';
import Select from '../../common/forms/Select';
import { ACCOUNTS_SAMPLE_DATA } from '../../common/fixtures/accounts.sample.data';
import {
  REF_ACCOUNT_TYPES,
  REF_ACCOUNT_TYPES_SELECT_OPTIONS,
  REF_BANKS,
  REF_BANKS_SELECT_OPTIONS,
  REF_STATUS_SELECT_OPTIONS,
} from '../../common/fixtures/refTypes.sample.data';
import {
  DisplayCardBody,
  DisplayCardRow,
  DisplayCardWrapper,
} from '../../styles/styled.card.style';
import HrefLink from '../../common/forms/HrefLink';
import Table from '../../common/forms/Table';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => mockUseNavigate,
}));

describe('accounts tests', () => {
  const exampleUsername = 'example86';

  const getAccounts = jest.fn();
  const setAlert = jest.fn();
  const resetAlert = jest.fn();
  const resetOnPageLeave = jest.fn();
  const clearAccountsFilterSpy = jest.spyOn(
    accountsStateAction,
    'clearAccountsFilter',
  );
  const setAccountsFilterSpy = jest.spyOn(
    accountsStateAction,
    'setAccountsFilter',
  );

  const accountProps = {
    error: '',
    success: '',
    accountsList: [],
    accountTypes: REF_ACCOUNT_TYPES,
    banks: REF_BANKS,
    getAccounts,
    setAlert,
    resetAlert,
    resetOnPageLeave,
  };

  function renderAccounts(customProps = {}) {
    const props = { ...accountProps, ...customProps };

    return mount(
      <AuthContext.Provider value={getAuthSample()}>
        <Accounts {...props} />
      </AuthContext.Provider>,
    );
  }

  it('matches snapshot', () => {
    const output = renderAccounts();
    expect(toJson(output)).toMatchSnapshot();
  });

  describe('call to get accounts', () => {
    it('calls get accounts when accountsList is empty', () => {
      getAccounts.mockReset();
      renderAccounts();
      expect(getAccounts).toHaveBeenCalledWith(exampleUsername);
    });

    it('does not call get accounts when accountsList has value', () => {
      getAccounts.mockReset();
      renderAccounts({ accountsList: ACCOUNTS_SAMPLE_DATA });
      expect(getAccounts).not.toHaveBeenCalled();
    });
  });

  describe('alerts messages', () => {
    it('calls set alert when there is an error message', () => {
      renderAccounts({
        error: 'this-is-error',
      });
      expect(setAlert).toHaveBeenCalledWith('failure', 'this-is-error');
    });

    it('calls set alert when there is a success message', () => {
      renderAccounts({
        success: 'this-is-success',
      });
      expect(setAlert).toHaveBeenCalledWith('success', 'this-is-success');
      expect(clearAccountsFilterSpy).toHaveBeenCalled();
    });

    it('calls reset alert when leaving the page', () => {
      const output = renderAccounts();
      output.unmount();
      expect(resetAlert).toHaveBeenCalled();
      expect(resetOnPageLeave).toHaveBeenCalled();
    });
  });

  describe('accounts header', () => {
    const output = renderAccounts();

    it('header background color', () => {
      const headerBody = output.find(DisplayCardBody).at(0);
      expect(headerBody.prop('background')).toEqual('darkseagreen');
    });

    it('header text', () => {
      const headerText = output.find('h4');
      expect(headerText.text()).toEqual('Accounts');
    });
  });

  describe('account filters', () => {
    const output = renderAccounts({ accountsList: ACCOUNTS_SAMPLE_DATA });

    it('filters background color ', () => {
      const filtersBody = output.find(DisplayCardBody).at(1);
      expect(filtersBody.prop('background')).not.toBeDefined();
    });

    it('filters text', () => {
      const filtersBodyHeaderText = output.find(DisplayCardRow).at(0);
      expect(filtersBodyHeaderText.prop('fontWeight')).toEqual('bold');
      expect(filtersBodyHeaderText.text()).toEqual('Account Filters');
    });

    it('filters link to add new account', () => {
      const filterLinkText = output.find(DisplayCardRow).at(4);
      expect(filterLinkText.prop('borderTop')).toEqual(true);

      const hrefLink = filterLinkText.find(HrefLink);
      expect(hrefLink.prop('linkTo')).toEqual('#');
      expect(hrefLink.prop('title')).toEqual('To Add a New Account Click Here');

      const ahref = output.find('#accounts-add-new-account').at(0);
      expect(ahref.text()).toEqual('To Add a New Account Click Here');

      ahref.simulate('click');
      expect(mockUseNavigate).toHaveBeenCalledTimes(1);
      expect(mockUseNavigate).toHaveBeenCalledWith('/account/');
    });

    it('filter dropdowns', () => {
      const selects = output.find(Select);
      expect(selects.length).toEqual(3);

      expect(selects.at(0).prop('id')).toEqual('filter-account-select-type');
      expect(selects.at(0).prop('label')).toEqual('Account Type');
      expect(selects.at(1).prop('id')).toEqual('filter-account-select-bank');
      expect(selects.at(1).prop('label')).toEqual('Bank Name');
      expect(selects.at(2).prop('id')).toEqual('filter-account-select-status');
      expect(selects.at(2).prop('label')).toEqual('Account Status');
    });

    it('filter dropdown options', () => {
      const selects = output.find(Select);

      expect(selects.at(0).prop('options')).toEqual(
        REF_ACCOUNT_TYPES_SELECT_OPTIONS,
      );
      expect(selects.at(1).prop('options')).toEqual(REF_BANKS_SELECT_OPTIONS);
      expect(selects.at(2).prop('options')).toEqual(REF_STATUS_SELECT_OPTIONS);
    });

    it('filter dropdown option selected', () => {
      // select account type, dispatches to set account status as filter
      const statusSelect = output.find('#filter-account-select-status').at(1);
      statusSelect.simulate('change', {
        target: { value: 'ACTIVE' },
      });
      expect(setAccountsFilterSpy).toHaveBeenCalledTimes(1);
      expect(setAccountsFilterSpy).toHaveBeenCalledWith(
        'status',
        'ACTIVE',
        ACCOUNTS_SAMPLE_DATA,
      );
    });
  });

  describe('accounts filters applied', () => {
    const output = renderAccounts({ accountsList: ACCOUNTS_SAMPLE_DATA });
    let clearFiltersLink: any,
      displayCardWrappers: any,
      displayCardRowHeader: any;

    it('does not display selected filter', () => {
      expect(clearAccountsFilterSpy).toHaveBeenCalledTimes(1);

      displayCardWrappers = output.find(DisplayCardWrapper);
      expect(displayCardWrappers.length).toEqual(3);

      clearFiltersLink = output.find('#accounts-clear-filters');
      expect(clearFiltersLink.length).toEqual(0);
    });

    it('displays Account Status as selected filter', () => {
      const statusSelect = output.find('#filter-account-select-status').at(1);
      statusSelect.simulate('change', {
        target: { value: 'ACTIVE' },
      });

      displayCardWrappers = output.find(DisplayCardWrapper);
      expect(displayCardWrappers.length).toEqual(4);

      const displayCardRowHeader = displayCardWrappers
        .at(2)
        .find(DisplayCardRow)
        .at(0);
      expect(displayCardRowHeader.text()).toEqual(
        'Filters Currently Applied: [Account Status]',
      );
    });

    it('displays clear filter link', () => {
      clearFiltersLink = output.find('#accounts-clear-filters').at(1);
      expect(clearFiltersLink.text()).toEqual(
        'Clear Filters and Show All Accounts',
      );
    });

    it('displays Account Type as selected filter', () => {
      const typeSelect = output.find('#filter-account-select-type').at(1);
      typeSelect.simulate('change', {
        target: { value: '5ede4cf30525eb78290332e7' },
      });

      displayCardWrappers = output.find(DisplayCardWrapper);
      expect(displayCardWrappers.length).toEqual(4);

      displayCardRowHeader = displayCardWrappers
        .at(2)
        .find(DisplayCardRow)
        .at(0);
      expect(displayCardRowHeader.text()).toEqual(
        'Filters Currently Applied: [Account Type][Account Status]',
      );
    });

    it('displays Bank as selected filter', () => {
      const bankSelect = output.find('#filter-account-select-bank').at(1);
      bankSelect.simulate('change', {
        target: { value: '5ede4d8d0525eb78290332f0' },
      });

      displayCardWrappers = output.find(DisplayCardWrapper);
      expect(displayCardWrappers.length).toEqual(4);

      const displayCardRowHeader = displayCardWrappers
        .at(2)
        .find(DisplayCardRow)
        .at(0);
      expect(displayCardRowHeader.text()).toEqual(
        'Filters Currently Applied: [Account Type][Bank][Account Status]',
      );
    });

    it('clears filters', () => {
      clearFiltersLink.simulate('click');
      expect(clearAccountsFilterSpy).toHaveBeenCalledTimes(2);

      // does not display selected filters after clear
      displayCardWrappers = output.find(DisplayCardWrapper);
      expect(displayCardWrappers.length).toEqual(3);

      clearFiltersLink = output.find('#accounts-clear-filters');
      expect(clearFiltersLink.length).toEqual(0);
    });
  });

  describe('accounts list table', () => {
    const output = renderAccounts({ accountsList: ACCOUNTS_SAMPLE_DATA });

    describe('accounts list table contents', () => {
      const table = output.find(Table);

      it('accounts list table header', () => {
        const tableHeaders = table.find('thead').find('th');
        expect(tableHeaders.length).toEqual(5);

        const actualTableHeadersText = tableHeaders.map((tableHeader) =>
          tableHeader.text(),
        );
        const expectedTableHeadersText = [
          'Bank Name',
          'Account Type',
          'Account Name',
          'Opening Balance',
          'Current Balance',
        ];
        expect(actualTableHeadersText).toEqual(expectedTableHeadersText);
      });

      it('accounts list table footer', () => {
        const tableFooter = table.find('tfoot').find('tr').find('td');
        expect(tableFooter.text()).toEqual('Number of Records: 10');
      });

      describe('accounts list table body', () => {
        it('accounts list table body rows', () => {
          const tableBodyRows = table.find('tbody').find('tr');
          expect(tableBodyRows.length).toEqual(10);
        });

        it('accounts list table formatted positive balance', () => {
          const checkingAccountRow = table
            .find('tbody')
            .find('tr')
            .at(2)
            .find('td');
          expect(checkingAccountRow.length).toEqual(5);
          // length is same as `account list table header` test above
          const actualRowTexts = checkingAccountRow.map((tableRowText) =>
            tableRowText.text(),
          );
          const expectedRowTexts = [
            'BANK OF AMERICA',
            'CHECKING ACCOUNT',
            'BOFA-ADV PLUS',
            '$10,017.06',
            '$14,362.02',
          ];

          expect(actualRowTexts).toEqual(expectedRowTexts);
        });

        it('accounts list table formatted negative balance', () => {
          const creditCardRow = table.find('tbody').find('tr').at(4).find('td');
          expect(creditCardRow.length).toEqual(5);
          // length is same as `account list table header` test above
          const actualRowTexts = creditCardRow.map((tableRowText) =>
            tableRowText.text(),
          );
          const expectedRowTexts = [
            'CHASE BANK',
            'CREDIT CARD',
            'CHASE-AMAZON',
            '-$1.07',
            '-$14.05',
          ];

          expect(actualRowTexts).toEqual(expectedRowTexts);
        });

        it('accounts list click to open account details', () => {
          mockUseNavigate.mockReset();

          const accountNameColumn = table
            .find('tbody')
            .find('tr')
            .at(4)
            .find('td')
            .at(2);
          const accountNameLink = accountNameColumn.find(HrefLink);
          expect(accountNameLink.prop('linkTo')).toEqual('#');
          expect(accountNameLink.prop('title')).toEqual('CHASE-AMAZON');

          const accountNameLinkHref = accountNameLink.find('a');
          accountNameLinkHref.simulate('click');
          expect(mockUseNavigate).toHaveBeenCalledWith(
            '/account/5ede989a2c473171d7464592',
          );
        });
      });
    });
  });
});
