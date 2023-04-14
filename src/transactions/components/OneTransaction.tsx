import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Account } from '../../accounts/types/accounts.data.types';
import { numberFormatter } from '../../accounts/utils/accounts.utils';
import { AuthContext } from '../../app/context/AuthContext';
import Modal from '../../common/components/Modal';
import Button from '../../common/forms/Button';
import HrefLink from '../../common/forms/HrefLink';
import Input, { InputType } from '../../common/forms/Input';
import RadioButton from '../../common/forms/RadioButton';
import Select from '../../common/forms/Select';
import TextArea from '../../common/forms/TextArea';
import { RefCategory, RefCategoryType, RefTransactionType } from '../../common/types/refTypes.data.types';
import {
  ALERT_TYPE_FAILURE,
  ALERT_TYPE_SUCCESS,
  CATEGORY_TYPE_ID_INCOME,
  CATEGORY_TYPE_ID_TRANSFER,
  checkBoxOptionsYesNo,
  MERCHANT_ID_TRANSFER,
  TRANSACTION_TYPE_ID_INCOME,
  TRANSACTION_TYPE_ID_TRANSFER,
} from '../../common/utils/constants';
import { Merchant } from '../../merchants/types/merchants.data.types';
import { DisplayCardBody, DisplayCardRow, DisplayCardWrapper } from '../../styles/styled.card.style';
import oneTransaction from '../reducers/oneTransaction.reducer';
import {
  DefaultOneTransactionOne,
  OneTransactionOne,
  OneTransactionValidationMessages,
  Transaction,
  TransactionsRequest,
} from '../types/transactions.data.types';
import { validateTransaction } from '../utils/transaction.validator.utils';
import {
  filterAccountOptions,
  filterCategoryOptions,
  filterCategoryTypeOptions,
  filterMerchantOptions,
  filterTransactionTypeOptions,
  getQueryParamsValue,
  isTransactionDataUpdated,
  isTransactionTypeTransfer,
  toUppercaseRemoveApostrophe,
} from '../utils/transactions.utils';

interface OneTransactionProps {
  error: string;
  success: string;
  transactionsList: Transaction[];
  selectedTransaction: Transaction;
  transactionTypes: RefTransactionType[];
  categoryTypes: RefCategoryType[];
  categories: RefCategory[];
  accountsList: Account[];
  merchantsList: Merchant[];
  getTransactions: (username: string, selectedTransactionId: string) => void;
  updateTransaction: (username: string, id: string, transactionsRequest: TransactionsRequest, method: string) => void;
  deleteTransaction: (username: string, id: string) => void;
  getAccounts: (username: string) => void;
  getMerchants: (username: string) => void;
  setAlert: (type: string, messageKey: string, messageBody?: JSX.Element) => void;
  resetAlert: () => void;
  resetOnPageLeave: () => void;
}

interface QueryParams {
  accountId: string;
  merchantId: string;
}

const DefaultQueryParams: QueryParams = {
  accountId: '',
  merchantId: '',
};

const OneTransaction = (props: OneTransactionProps): React.ReactElement => {
  const [username, setUsername] = useState('');
  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (authContext.auth && authContext.auth.isLoggedIn) {
      setUsername(authContext.auth.userDetails.username);
    } else {
      setUsername('');
    }
  }, [authContext]);

  const {
    error,
    success,
    selectedTransaction,
    transactionsList,
    accountsList,
    merchantsList,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    getAccounts,
    getMerchants,
    resetOnPageLeave,
    resetAlert,
    setAlert,
  } = props;

  const [transactionData, setTransactionData] = useReducer(oneTransaction, DefaultOneTransactionOne);
  const [isValidId, setIsValidId] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [queryParamsValue, setQueryParamsValue] = useState(DefaultQueryParams);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && id !== ':id') {
      setIsValidId(true);
    } else {
      setIsValidId(false);
    }
  }, [id]);

  useEffect(() => {
    if (username && isValidId) {
      getTransactions(username, id || '');
    }
  }, [getTransactions, id, isValidId, transactionsList, username]);

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

  const oneTransactionFromTransaction = (transaction: Transaction, queryParams: QueryParams): OneTransactionOne => {
    return {
      id: transaction.id,
      description: transaction.description,
      accountId: queryParams.accountId || transaction.account.id,
      trfAccountId: transaction.trfAccount?.id,
      amount: transaction.amount,
      categoryId: transaction.refCategory.id,
      categoryTypeId: transaction.refCategory.refCategoryType.id,
      date: transaction.date,
      merchantId: queryParams.merchantId || transaction.refMerchant.id,
      newMerchant: '',
      transactionTypeId: transaction.refTransactionType.id,
      username: transaction.user.username,
      necessary: transaction.necessary === undefined ? '' : transaction.necessary ? 'YES' : 'NO',
      regular: transaction.regular === undefined ? '' : transaction.regular ? 'YES' : 'NO',
    };
  };

  const transactionRequestFromOneTransaction = (): TransactionsRequest => {
    return {
      description: toUppercaseRemoveApostrophe(transactionData.description),
      accountId: transactionData.accountId,
      trfAccountId: transactionData.trfAccountId,
      typeId: transactionData.transactionTypeId,
      categoryId: transactionData.categoryId,
      merchantId: isTransactionTypeTransfer(transactionData.transactionTypeId)
        ? MERCHANT_ID_TRANSFER
        : transactionData.merchantId,
      newMerchant: toUppercaseRemoveApostrophe(transactionData.newMerchant),
      date: transactionData.date,
      amount: numberFormatter(+transactionData.amount).replace('$', '').replace('-', ''),
      regular: transactionData.regular === 'YES',
      necessary: transactionData.necessary === 'YES',
      username,
    };
  };

  // get selected account or merchantId from query params
  const search = useLocation().search as string;
  useEffect(() => {
    if (search) {
      setQueryParamsValue(getQueryParamsValue(search));
    }
  }, [search]);

  useEffect(() => {
    setTransactionData({
      oneTransaction: oneTransactionFromTransaction(selectedTransaction, queryParamsValue),
    });
  }, [queryParamsValue, selectedTransaction]);

  useEffect(() => {
    error && setAlert(ALERT_TYPE_FAILURE, error);
    success && setAlert(ALERT_TYPE_SUCCESS, success);
  }, [error, success, setAlert]);

  const showAllTransactions = useCallback(() => {
    resetAlert();
    resetOnPageLeave();
    return navigate('/transactions');
  }, [navigate, resetAlert, resetOnPageLeave]);

  // clear message when leaving the page
  useEffect(() => {
    return () => {
      resetAlert();
      resetOnPageLeave();
    };
  }, [resetAlert, resetOnPageLeave]);

  const handleFieldChange = useCallback(
    (input: string, name: string) => {
      const setInputFieldValue = (inputValue: string | undefined, defaultValue: string) =>
        inputValue === undefined ? defaultValue : inputValue;

      const getChangedTransaction = ({
        transactionTypeId,
        categoryTypeId,
        categoryId,
        accountId,
        trfAccountId,
        merchantId,
        newMerchant,
        date,
        amount,
        regular,
        necessary,
        description,
      }: Partial<OneTransactionOne>): OneTransactionOne => {
        return {
          id: transactionData.id,
          transactionTypeId: setInputFieldValue(transactionTypeId, transactionData.transactionTypeId),
          categoryTypeId: setInputFieldValue(categoryTypeId, transactionData.categoryTypeId),
          categoryId: setInputFieldValue(categoryId, transactionData.categoryId),
          accountId: setInputFieldValue(accountId, transactionData.accountId),
          trfAccountId: setInputFieldValue(trfAccountId, transactionData.trfAccountId),
          merchantId: setInputFieldValue(merchantId, transactionData.merchantId),
          newMerchant: setInputFieldValue(newMerchant, transactionData.newMerchant),
          date: setInputFieldValue(date, transactionData.date),
          amount: setInputFieldValue(amount, transactionData.amount),
          regular: setInputFieldValue(regular, transactionData.regular || ''),
          necessary: setInputFieldValue(necessary, transactionData.necessary || ''),
          description: setInputFieldValue(description, transactionData.description),
          username,
        };
      };

      const changesForTxnTypeSelection = (input: string) => {
        if (input === TRANSACTION_TYPE_ID_TRANSFER) {
          return {
            transactionTypeId: input,
            categoryTypeId: CATEGORY_TYPE_ID_TRANSFER,
          };
        } else if (input === TRANSACTION_TYPE_ID_INCOME) {
          return {
            transactionTypeId: input,
            categoryTypeId: CATEGORY_TYPE_ID_INCOME,
          };
        } else {
          return { transactionTypeId: input, categoryTypeId: '' };
        }
      };

      let changedTransaction;
      switch (name) {
        case 'typeId':
          changedTransaction = getChangedTransaction(changesForTxnTypeSelection(input));
          setTransactionData({ oneTransaction: changedTransaction });
          break;
        case 'catTypeId':
          changedTransaction = getChangedTransaction({
            categoryTypeId: input,
          });
          setTransactionData({ oneTransaction: changedTransaction });
          break;
        case 'catId':
          changedTransaction = getChangedTransaction({
            categoryId: input,
          });
          setTransactionData({ oneTransaction: changedTransaction });
          break;
        case 'actId':
          changedTransaction = getChangedTransaction({
            accountId: input,
          });
          setTransactionData({ oneTransaction: changedTransaction });
          break;
        case 'trfActId':
          changedTransaction = getChangedTransaction({
            trfAccountId: input,
          });
          setTransactionData({ oneTransaction: changedTransaction });
          break;
        case 'mctId':
          changedTransaction = getChangedTransaction({
            merchantId: input,
          });
          setTransactionData({ oneTransaction: changedTransaction });
          break;
        case 'newMct':
          changedTransaction = getChangedTransaction({
            newMerchant: input,
          });
          setTransactionData({ oneTransaction: changedTransaction });
          break;
        case 'txnDate':
          changedTransaction = getChangedTransaction({
            date: input,
          });
          setTransactionData({ oneTransaction: changedTransaction });
          break;
        case 'txnAmt':
          changedTransaction = getChangedTransaction({
            amount: input,
          });
          setTransactionData({ oneTransaction: changedTransaction });
          break;
        case 'regTxn':
          changedTransaction = getChangedTransaction({
            regular: input,
          });
          setTransactionData({ oneTransaction: changedTransaction });
          break;
        case 'necTxn':
          changedTransaction = getChangedTransaction({
            necessary: input,
          });
          setTransactionData({ oneTransaction: changedTransaction });
          break;
        case 'desc':
          changedTransaction = getChangedTransaction({
            description: input,
          });
          setTransactionData({ oneTransaction: changedTransaction });
          break;
      }
    },
    [
      transactionData.accountId,
      transactionData.amount,
      transactionData.categoryId,
      transactionData.categoryTypeId,
      transactionData.date,
      transactionData.description,
      transactionData.id,
      transactionData.merchantId,
      transactionData.necessary,
      transactionData.newMerchant,
      transactionData.regular,
      transactionData.transactionTypeId,
      transactionData.trfAccountId,
      username,
    ],
  );

  const showBodyHeader = () => (
    <DisplayCardWrapper>
      <DisplayCardBody background="darkseagreen">
        <HrefLink
          id="one-txn-all-txnx-link-1"
          linkTo="#"
          title="To All Transactions List"
          onClick={() => showAllTransactions()}
          underline
          color="inherit"
          margin="0px 0px 5px 0px"
        />
        <h4>Transaction Details:</h4>
      </DisplayCardBody>
    </DisplayCardWrapper>
  );

  const showLinksBanner = useCallback(
    () => (
      <>
        <HrefLink
          id="one-txn-all-txns-link"
          linkTo="#"
          title=" [ Show All Transactions ] "
          onClick={() => showAllTransactions()}
          margin="0px 10px 0px 10px"
        />
      </>
    ),
    [showAllTransactions],
  );

  const transactionTypeSelect = useCallback(
    () => (
      <Select
        className="u-full-width"
        id="one-txn-type-select"
        label="Transaction Type"
        onChange={(value) => handleFieldChange(value, 'typeId')}
        value={transactionData.transactionTypeId}
        options={filterTransactionTypeOptions(props.transactionTypes)}
        required
      />
    ),
    [handleFieldChange, props.transactionTypes, transactionData.transactionTypeId],
  );

  const categoryTypeSelect = useCallback(
    () => (
      <Select
        className="u-full-width"
        id="one-txn-cat-type-select"
        label="Category Type"
        onChange={(value) => handleFieldChange(value, 'catTypeId')}
        value={transactionData.categoryTypeId}
        options={filterCategoryTypeOptions(props.categoryTypes)}
        required
      />
    ),
    [handleFieldChange, props.categoryTypes, transactionData.categoryTypeId],
  );

  const categorySelect = useCallback(
    () => (
      <Select
        className="u-full-width"
        id="one-txn-cat-select"
        label="Category Name"
        onChange={(value) => handleFieldChange(value, 'catId')}
        value={transactionData.categoryId}
        options={filterCategoryOptions(props.categories, transactionData.categoryTypeId)}
        required
      />
    ),
    [handleFieldChange, props.categories, transactionData.categoryId, transactionData.categoryTypeId],
  );

  const accountSelect = useCallback(
    () => (
      <Select
        className="u-full-width"
        id="one-txn-account-select"
        label="Account Name"
        onChange={(value) => handleFieldChange(value, 'actId')}
        value={transactionData.accountId}
        options={filterAccountOptions(props.accountsList)}
        required
      />
    ),
    [handleFieldChange, props.accountsList, transactionData.accountId],
  );

  const trfAccountSelect = useCallback(
    () => (
      <Select
        className="u-full-width"
        id="one-txn-trfaccount-select"
        label="Transfer To"
        onChange={(value) => handleFieldChange(value, 'trfActId')}
        value={transactionData.trfAccountId}
        options={filterAccountOptions(props.accountsList)}
        disabled={!isTransactionTypeTransfer(transactionData.transactionTypeId)}
      />
    ),
    [handleFieldChange, props.accountsList, transactionData.transactionTypeId, transactionData.trfAccountId],
  );

  const merchantSelect = useCallback(
    () => (
      <Select
        className="u-full-width"
        id="one-txn-merchant-select"
        label="Merchant Name"
        onChange={(value) => handleFieldChange(value, 'mctId')}
        value={transactionData.merchantId}
        options={filterMerchantOptions(props.merchantsList)}
        required
        disabled={isTransactionTypeTransfer(transactionData.transactionTypeId)}
      />
    ),
    [handleFieldChange, props.merchantsList, transactionData.merchantId, transactionData.transactionTypeId],
  );

  const newMerchantInput = useCallback(
    () => (
      <Input
        className="u-full-width"
        id="one-txn-new-merchant"
        label="[OR] Enter New Merchant"
        onChange={(value) => handleFieldChange(value, 'newMct')}
        value={transactionData.newMerchant}
        maxLength={25}
        disabled={isTransactionTypeTransfer(transactionData.transactionTypeId)}
      />
    ),
    [handleFieldChange, transactionData.newMerchant, transactionData.transactionTypeId],
  );

  const transactionDateInput = useCallback(
    () => (
      <Input
        className="u-full-width"
        type={InputType.date}
        id="one-txn-date"
        label="Transaction Date"
        onChange={(value) => handleFieldChange(value, 'txnDate')}
        value={transactionData.date}
        required
      />
    ),
    [handleFieldChange, transactionData.date],
  );

  const transactionAmountInput = useCallback(
    () => (
      <Input
        className="u-full-width"
        type={InputType.number}
        id="one-txn-amount"
        label="Transaction Amount"
        onChange={(value) => handleFieldChange(value, 'txnAmt')}
        value={transactionData.amount}
        required
      />
    ),
    [handleFieldChange, transactionData.amount],
  );

  const necessaryTxnRadioInput = useCallback(
    () => (
      <div style={{ marginTop: '33px' }}>
        <RadioButton
          id="one-txn-nec"
          name="one-txn-nec-rdio-btn"
          title="Necessary"
          radioButtons={checkBoxOptionsYesNo}
          onChange={(value) => handleFieldChange(value, 'necTxn')}
          selectedValue={transactionData.necessary}
          required
          showSideBySide
        />
      </div>
    ),
    [handleFieldChange, transactionData.necessary],
  );

  const regularTxnRadioInput = useCallback(
    () => (
      <div style={{ marginTop: '33px' }}>
        <RadioButton
          id="one-txn-reg"
          name="one-txn-reg-rdio-btn"
          title="Regular"
          radioButtons={checkBoxOptionsYesNo}
          onChange={(value) => handleFieldChange(value, 'regTxn')}
          selectedValue={transactionData.regular}
          required
          showSideBySide
        />
      </div>
    ),
    [handleFieldChange, transactionData.regular],
  );

  const transactionDescriptionInput = useCallback(
    () => (
      <TextArea
        className="u-full-width"
        id="one-txn-desc"
        label="Transaction Description"
        onChange={(value) => handleFieldChange(value, 'desc')}
        value={transactionData.description}
      />
    ),
    [handleFieldChange, transactionData.description],
  );

  const setValidationMessages = (validationMessages: OneTransactionValidationMessages) => (
    <>
      {validationMessages.requiredFieldsMessages
        ? `Required Fields Missing Error: ${validationMessages.requiredFieldsMessages}`
        : ''}
      <br />
      {validationMessages.txnTypeTransferMessages
        ? `Transfer Transaction Type Error: ${validationMessages.txnTypeTransferMessages}`
        : ''}
      <br />
      {validationMessages.otherMessages ? `Other Error: ${validationMessages.otherMessages}` : ''}
    </>
  );

  const updateTransactionAction = (method: string) => {
    const txnValidate = validateTransaction(transactionData);

    if (
      txnValidate &&
      (txnValidate.requiredFieldsMessages || txnValidate.txnTypeTransferMessages || txnValidate.otherMessages)
    ) {
      setAlert(ALERT_TYPE_FAILURE, '', setValidationMessages(txnValidate));
    } else {
      resetAlert();
      const transactionsRequest = transactionRequestFromOneTransaction();
      const txnId = isValidId ? id : '';
      updateTransaction(username, txnId || '', transactionsRequest, method);

      if (method === 'POST') {
        showAllTransactions();
      }
    }
  };

  const deleteTransactionActionBegin = () => {
    setIsDeleteModalOpen(true);
  };

  const deleteTransactionActionEnd = () => {
    setIsDeleteModalOpen(false);
    deleteTransaction(username, id || '');
    showAllTransactions();
  };

  const deleteTransactionModal = () => (
    <Modal
      setIsModalOpen={setIsDeleteModalOpen}
      header="Warning"
      body={`Are you sure you want to delete this transaction from date ${transactionData.date}?`}
      primaryButton="Yes"
      primaryButtonAction={() => deleteTransactionActionEnd()}
      secondaryButton="Cancel"
      secondaryButtonAction={() => setIsDeleteModalOpen(false)}
    />
  );

  const isUpdateResetDisabled = () => isTransactionDataUpdated(selectedTransaction, transactionData);

  const addTransactionButton = () => (
    <Button
      id="one-txn-button-add"
      title="Add Transaction"
      onClick={() => updateTransactionAction('POST')}
      includeBorder
      disabled={isUpdateResetDisabled()}
    />
  );

  const updateTransactionButton = () => (
    <Button
      id="one-txn-button-update"
      title="Update Transaction"
      onClick={() => updateTransactionAction('PUT')}
      includeBorder
      disabled={isUpdateResetDisabled()}
    />
  );

  const deleteTransactionButton = () => (
    <Button
      id="one-txn-button-delete"
      title="Delete Transaction"
      onClick={() => deleteTransactionActionBegin()}
      includeBorder
    />
  );

  const resetTransactionButton = () => (
    <Button
      id="one-txn-button-reset"
      title="Revert Changes"
      onClick={() =>
        setTransactionData({
          oneTransaction: oneTransactionFromTransaction(selectedTransaction, queryParamsValue),
        })
      }
      includeBorder
      disabled={isUpdateResetDisabled()}
    />
  );

  const addButtons = () => (
    <>
      {addTransactionButton()}
      {resetTransactionButton()}
    </>
  );

  const updateButtons = () => (
    <>
      {updateTransactionButton()}
      {deleteTransactionButton()}
      {resetTransactionButton()}
    </>
  );

  const showTransactionContent = () => (
    <DisplayCardWrapper>
      <DisplayCardBody>
        <div className="container">
          <div className="row">
            <div className="four columns">
              <DisplayCardRow>{transactionTypeSelect()}</DisplayCardRow>
            </div>
            <div className="four columns">
              <DisplayCardRow>{categoryTypeSelect()}</DisplayCardRow>
            </div>
            <div className="four columns">
              <DisplayCardRow>{categorySelect()}</DisplayCardRow>
            </div>
          </div>
          <div className="row">
            <div className="three columns">
              <DisplayCardRow>{accountSelect()}</DisplayCardRow>
            </div>
            <div className="three columns">
              <DisplayCardRow>{trfAccountSelect()}</DisplayCardRow>
            </div>
            <div className="three columns">
              <DisplayCardRow>{merchantSelect()}</DisplayCardRow>
            </div>
            <div className="three columns">
              <DisplayCardRow>{newMerchantInput()}</DisplayCardRow>
            </div>
          </div>
          <div className="row">
            <div className="three columns">
              <DisplayCardRow>{transactionDateInput()}</DisplayCardRow>
            </div>
            <div className="three columns">
              <DisplayCardRow>{transactionAmountInput()}</DisplayCardRow>
            </div>
            <div className="three columns">
              <DisplayCardRow>{regularTxnRadioInput()}</DisplayCardRow>
            </div>
            <div className="three columns">
              <DisplayCardRow>{necessaryTxnRadioInput()}</DisplayCardRow>
            </div>
          </div>
          <DisplayCardRow>
            <div className="row">
              <div className="twelve columns">{transactionDescriptionInput()}</div>
            </div>
          </DisplayCardRow>
          <DisplayCardRow>
            <div className="row">
              <div className="twelve columns">
                {isValidId ? updateButtons() : addButtons()}
                {showLinksBanner()}
              </div>
            </div>
          </DisplayCardRow>
        </div>
      </DisplayCardBody>
    </DisplayCardWrapper>
  );

  return (
    <>
      {showBodyHeader()}
      {showTransactionContent()}
      {isDeleteModalOpen && deleteTransactionModal()}
    </>
  );
};

export default OneTransaction;
