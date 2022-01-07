import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Account } from '../../accounts/types/accounts.data.types';
import { AuthContext } from '../../app/context/AuthContext';
import Checkbox from '../../common/forms/Checkbox';
import HrefLink from '../../common/forms/HrefLink';
import Input, { InputType } from '../../common/forms/Input';
import Select from '../../common/forms/Select';
import {
  RefCategory,
  RefCategoryType,
  RefTransactionType,
} from '../../common/types/refTypes.data.types';
import {
  ALERT_TYPE_FAILURE,
  ALERT_TYPE_SUCCESS,
  checkBoxOptionsYesNo,
  SESSION_TRANSACTION_FILTERS,
} from '../../common/utils/constants';
import {
  getStartOfTheMonth,
  getStartOfTheYear,
} from '../../common/utils/momentHelper';
import { SessionStorage } from '../../common/utils/sessionStorageHelper';
import { Merchant } from '../../merchants/types/merchants.data.types';
import {
  DisplayCardBody,
  DisplayCardRow,
  DisplayCardWrapper,
} from '../../styles/styled.card.style';
import {
  resetTransactionFilters,
  setTransactionFilter,
  setTransactionFilters,
} from '../actions/transactions.state.action';
import transactionsStateReducer from '../reducers/transactions.state.reducer';
import {
  DefaultTransactionsReducerState,
  Transaction,
  TransactionFilters,
} from '../types/transactions.data.types';
import {
  filterAccountOptions,
  filterCategoryOptions,
  filterCategoryTypeOptions,
  filterMerchantOptions,
  filterTransactionTypeOptions,
  getTransactionFilter,
  getTransactionFilters,
  isTransactionFilterApplied,
} from '../utils/transactions.utils';
import TransactionsList from './TransactionsList';

// <div style={{  display: 'inline-flex',  flexWrap: 'wrap',  gap: '12px',}}>
const TransactionFilterStyle = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 12px;
`;
const TransactionFilterStyleWithMargin = styled(TransactionFilterStyle)`
  margin-top: 33px;
`;

interface TransactionsProps {
  error: string;
  success: string;
  transactionsList: Transaction[];
  transactionTypes: RefTransactionType[];
  categoryTypes: RefCategoryType[];
  categories: RefCategory[];
  accountsList: Account[];
  merchantsList: Merchant[];
  getTransactions: (username: string) => void;
  deleteTransaction: (username: string, id: string) => void;
  getAccounts: (username: string) => void;
  getMerchants: (username: string) => void;
  setAlert: (type: string, messageKey: string) => void;
  resetAlert: () => void;
  resetOnPageLeave: () => void;
}

const Transactions = (props: TransactionsProps): React.ReactElement => {
  const [username, setUsername] = useState('');
  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (authContext.auth && authContext.auth.isLoggedIn) {
      setUsername(authContext.auth.userDetails.username);
    } else {
      setUsername('');
    }
  }, [authContext]);

  const [transactionsState, transactionsDispatch] = useReducer(
    transactionsStateReducer,
    DefaultTransactionsReducerState,
  );

  const {
    error,
    success,
    transactionsList,
    accountsList,
    merchantsList,
    getTransactions,
    deleteTransaction,
    getAccounts,
    getMerchants,
    setAlert,
    resetAlert,
    resetOnPageLeave,
  } = props;

  // get filter data from session upon page refresh
  useEffect(() => {
    const transactionFilters = SessionStorage.getItem(
      SESSION_TRANSACTION_FILTERS,
    ) as TransactionFilters;
    if (isTransactionFilterApplied(transactionFilters)) {
      transactionsDispatch(
        setTransactionFilters(transactionFilters, transactionsList),
      );
    }
  }, [transactionsList]);

  const { displayTransactionsList, transactionFilters } = transactionsState;

  useEffect(() => {
    if (username && transactionsList.length === 0) {
      getTransactions(username);
    }
  }, [getTransactions, transactionsList.length, username]);

  useEffect(() => {
    if (username && accountsList.length === 0) {
      getAccounts(username);
    }
  }, [accountsList, getAccounts, username]);

  useEffect(() => {
    if (username && merchantsList.length === 0) {
      getMerchants(username);
    }
  }, [getMerchants, merchantsList, username]);

  useEffect(() => {
    error && setAlert(ALERT_TYPE_FAILURE, error);

    if (success) {
      setAlert(ALERT_TYPE_SUCCESS, success);
      clearFilters();
    }
  }, [error, success, setAlert]);

  // clear message when leaving the page
  useEffect(() => {
    return () => {
      resetAlert();
      resetOnPageLeave();
    };
  }, [resetAlert, resetOnPageLeave]);

  const clearFilters = () => transactionsDispatch(resetTransactionFilters());

  const setFilters = useCallback(
    (name: string, value: string) => {
      if (value === 'startMonth') {
        value = getStartOfTheMonth();
      } else if (value === 'startYear') {
        value = getStartOfTheYear();
      }
      const txnFilters = getTransactionFilters(name, value, transactionFilters);
      transactionsDispatch(setTransactionFilters(txnFilters, transactionsList));
    },
    [transactionFilters, transactionsList],
  );

  const setFilter = useCallback(
    (name: string, value: string) => {
      const txnFilters = getTransactionFilter(name, value, transactionFilters);
      transactionsDispatch(setTransactionFilter(txnFilters));
    },
    [transactionFilters],
  );

  const resetFilters = useCallback(() => {
    transactionsDispatch(resetTransactionFilters());
  }, []);

  const filterByTransactionType = useCallback(
    () => (
      <Select
        className="u-full-width"
        id="filter-txn-type-select"
        label="Transaction Type"
        onChange={(value) => setFilters('txnType', value)}
        value={transactionFilters.transactionTypeId || ''}
        options={filterTransactionTypeOptions(props.transactionTypes)}
      />
    ),
    [props.transactionTypes, setFilters, transactionFilters.transactionTypeId],
  );

  const filterByCategoryType = useCallback(
    () => (
      <Select
        className="u-full-width"
        id="filter-cat-type-select"
        label="Category Type"
        onChange={(value) => setFilters('catType', value)}
        value={transactionFilters.categoryTypeId || ''}
        options={filterCategoryTypeOptions(props.categoryTypes)}
      />
    ),
    [props.categoryTypes, setFilters, transactionFilters.categoryTypeId],
  );

  const filterByCategory = useCallback(
    () => (
      <Select
        className="u-full-width"
        id="filter-cat-select"
        label="Category Name"
        onChange={(value) => setFilters('cat', value)}
        value={transactionFilters.categoryId || ''}
        options={filterCategoryOptions(
          props.categories,
          transactionFilters.categoryTypeId,
        )}
      />
    ),
    [
      props.categories,
      setFilters,
      transactionFilters.categoryId,
      transactionFilters.categoryTypeId,
    ],
  );

  const filterByAccount = useCallback(
    () => (
      <Select
        className="u-full-width"
        id="filter-account-select"
        label="Account Name"
        onChange={(value) => setFilters('act', value)}
        value={transactionFilters.accountId || ''}
        options={filterAccountOptions(props.accountsList)}
      />
    ),
    [props.accountsList, setFilters, transactionFilters.accountId],
  );

  const filterByMerchant = useCallback(
    () => (
      <Select
        className="u-full-width"
        id="filter-merchant-select"
        label="Merchant Name"
        onChange={(value) => setFilters('mct', value)}
        value={transactionFilters.merchantId || ''}
        options={filterMerchantOptions(props.merchantsList)}
      />
    ),
    [props.merchantsList, setFilters, transactionFilters.merchantId],
  );

  const filterByTxnAmount = useCallback(() => {
    return (
      <TransactionFilterStyle>
        <Input
          className="u-full-width"
          type={InputType.number}
          id="filter-amount-from"
          label="Txn Amt (FROM)"
          onBlur={(event) => setFilters('amtFrom', event?.target?.value || '')}
          onChange={(value) => setFilter('amtFrom', value)}
          value={transactionFilters.txnAmountFrom || ''}
          maxLength={10}
        />
        <Input
          className="u-full-width"
          type={InputType.number}
          id="filter-amount-to"
          label="Txn Amt (TO)"
          onBlur={(event) => setFilters('amtTo', event?.target?.value || '')}
          onChange={(value) => setFilter('amtTo', value)}
          value={transactionFilters.txnAmountTo || ''}
          maxLength={10}
        />
      </TransactionFilterStyle>
    );
  }, [
    setFilter,
    setFilters,
    transactionFilters.txnAmountFrom,
    transactionFilters.txnAmountTo,
  ]);

  const filterByRegularTxns = () => (
    <div style={{ marginTop: '33px' }}>
      <Checkbox
        id="filter-regular"
        title="Regular"
        checkboxes={checkBoxOptionsYesNo}
        onClick={(value) => setFilters('reg', value)}
        checkedValues={transactionFilters.regular}
        showSideBySide
      />
    </div>
  );

  const filterByNecessaryTxns = () => (
    <div style={{ marginTop: '33px' }}>
      <Checkbox
        id="filter-necessary"
        title="Necessary"
        checkboxes={checkBoxOptionsYesNo}
        onClick={(value) => setFilters('nec', value)}
        checkedValues={transactionFilters.necessary}
        showSideBySide
      />
    </div>
  );

  const filterByTxnDate = useCallback(() => {
    return (
      <TransactionFilterStyle>
        <Input
          className="u-full-width"
          type={InputType.date}
          id="filter-date-from"
          label="Txn Date (FROM)"
          onBlur={(event) => setFilters('dateFrom', event?.target?.value || '')}
          onChange={(value) => setFilter('dateFrom', value)}
          value={transactionFilters.txnDateFrom || ''}
          maxLength={10}
        />
        <Input
          className="u-full-width"
          type={InputType.date}
          id="filter-date-to"
          label="Txn Date (TO)"
          onBlur={(event) => setFilters('dateTo', event?.target?.value || '')}
          onChange={(value) => setFilter('dateTo', value)}
          value={transactionFilters.txnDateTo || ''}
          maxLength={10}
        />
        <TransactionFilterStyleWithMargin>
          <HrefLink
            id="txn-beg-of-month"
            linkTo="#"
            onClick={() => setFilters('dateFrom', 'startYear')}
            title="Start of the Year"
          />
          {'  |  '}
          <HrefLink
            id="txn-beg-of-month"
            linkTo="#"
            onClick={() => setFilters('dateFrom', 'startMonth')}
            title="Start of the Month"
          />
        </TransactionFilterStyleWithMargin>
      </TransactionFilterStyle>
    );
  }, [
    setFilter,
    setFilters,
    transactionFilters.txnDateFrom,
    transactionFilters.txnDateTo,
  ]);

  const navigate = useNavigate();
  const showAddNewTransaction = () => {
    return navigate('/transaction');
  };

  const showFiltersContent = () => (
    <DisplayCardWrapper>
      <DisplayCardBody>
        <DisplayCardRow borderBtm>
          <HrefLink
            id="txns-add-new-txn"
            linkTo="#"
            title="To Add a New Transaction Click Here"
            onClick={() => showAddNewTransaction()}
          />
        </DisplayCardRow>
        <DisplayCardRow borderBtm fontWeight="bold">
          Transaction Filters
        </DisplayCardRow>
        <div className="container">
          <div className="row">
            <div className="three columns">
              <DisplayCardRow>{filterByTransactionType()}</DisplayCardRow>
            </div>
            <div className="three columns">
              <DisplayCardRow>{filterByCategoryType()}</DisplayCardRow>
            </div>
            <div className="three columns">
              <DisplayCardRow>{filterByCategory()}</DisplayCardRow>
            </div>
            <div className="three columns">
              <DisplayCardRow>{filterByAccount()}</DisplayCardRow>
            </div>
          </div>
          <div className="row">
            <div className="four columns">
              <DisplayCardRow>{filterByMerchant()}</DisplayCardRow>
            </div>
            <div className="five columns">
              <DisplayCardRow>{filterByTxnAmount()}</DisplayCardRow>
            </div>
            <div className="three columns">
              <DisplayCardRow>{filterByRegularTxns()}</DisplayCardRow>
            </div>
          </div>
          <div className="row">
            <div className="nine columns">
              <DisplayCardRow>{filterByTxnDate()}</DisplayCardRow>
            </div>
            <div className="three columns">
              <DisplayCardRow>{filterByNecessaryTxns()}</DisplayCardRow>
            </div>
          </div>
        </div>
      </DisplayCardBody>
    </DisplayCardWrapper>
  );

  const filtersCurrentlyApplied = useMemo(() => {
    let filterText = '';
    if (transactionFilters.transactionTypeId) {
      filterText += '[Transaction Type]';
    }
    if (transactionFilters.categoryTypeId) {
      filterText += '[Category Type]';
    }
    if (transactionFilters.categoryId) {
      filterText += '[Category]';
    }
    if (transactionFilters.accountId) {
      filterText += '[Account]';
    }
    if (transactionFilters.merchantId) {
      filterText += '[Merchant]';
    }
    if (
      transactionFilters.txnAmountFromOnBlur ||
      transactionFilters.txnAmountToOnBlur
    ) {
      filterText += '[Txn Amount]';
    }
    if (
      transactionFilters.txnDateFromOnBlur ||
      transactionFilters.txnDateToOnBlur
    ) {
      filterText += '[Txn Date]';
    }
    if (transactionFilters.regular.length > 0) {
      filterText += `[Regular Txns: ${transactionFilters.regular[0]}]`;
    }
    if (transactionFilters.necessary.length > 0) {
      filterText += `[Necessary Txns: ${transactionFilters.necessary[0]}]`;
    }

    if (filterText) {
      return 'Filters Currently Applied: ' + filterText;
    } else {
      return '';
    }
  }, [transactionFilters]);

  const showFiltersApplied = () => (
    <DisplayCardWrapper>
      <DisplayCardBody>
        <DisplayCardRow fontWeight="bold">
          {filtersCurrentlyApplied}
        </DisplayCardRow>
        <DisplayCardRow borderTop>
          <HrefLink
            id="txns-clear-filters"
            linkTo="#"
            title="Clear Filters and Show All Transactions"
            onClick={() => resetFilters()}
            margin="10px 0px 10px 0px"
          />
        </DisplayCardRow>
      </DisplayCardBody>
    </DisplayCardWrapper>
  );

  const showBodyHeader = () => (
    <DisplayCardWrapper>
      <DisplayCardBody background="darkseagreen">
        <h4>Transactions</h4>
      </DisplayCardBody>
    </DisplayCardWrapper>
  );

  const isFilterCurrentlyApplied =
    isTransactionFilterApplied(transactionFilters);

  const transactionsToDisplay = useMemo(() => {
    return isFilterCurrentlyApplied
      ? displayTransactionsList
      : transactionsList;
  }, [displayTransactionsList, isFilterCurrentlyApplied, transactionsList]);

  const showTransactionsList = useCallback(
    () => (
      <TransactionsList
        transactions={transactionsToDisplay}
        username={username}
        deleteTransaction={deleteTransaction}
      />
    ),
    [deleteTransaction, transactionsToDisplay, username],
  );

  return (
    <>
      {showBodyHeader()}
      {showFiltersContent()}
      {isFilterCurrentlyApplied && showFiltersApplied()}
      {showTransactionsList()}
    </>
  );
};

export default Transactions;
