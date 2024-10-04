import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '../../app/context/AuthContext';
import Modal from '../../common/components/Modal';
import Button from '../../common/forms/Button';
import HrefLink from '../../common/forms/HrefLink';
import Input from '../../common/forms/Input';
import { ALERT_TYPE_FAILURE, ALERT_TYPE_SUCCESS } from '../../common/utils/constants';
import { DisplayCardBody, DisplayCardRow, DisplayCardWrapper } from '../../styles/styled.card.style';
import TransactionsList from '../../transactions/components/TransactionsList';
import { Transaction, TransactionFilters } from '../../transactions/types/transactions.data.types';
import { Merchant } from '../types/merchants.data.types';

export interface OneMerchantProps {
  error: string;
  success: string;
  merchantsList: Merchant[];
  selectedMerchant: Merchant;
  selectedMerchantTransactions: Transaction[];
  getMerchants: (username: string, selectedMerchantId: string) => void;
  updateMerchant: (username: string, id: string, description: string) => void;
  deleteMerchant: (username: string, id: string) => void;
  setAlert: (type: string, messageKey: string) => void;
  resetAlert: () => void;
  resetOnPageLeave: () => void;
  getTransactions: (username: string, transactionFilters: Partial<TransactionFilters>) => void;
  deleteTransaction: (username: string, id: string) => void;
}

const OneMerchant = (props: OneMerchantProps): React.ReactElement => {
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
    merchantsList,
    selectedMerchant,
    selectedMerchantTransactions,
    getMerchants,
    updateMerchant,
    deleteMerchant,
    setAlert,
    resetAlert,
    resetOnPageLeave,
    getTransactions,
    deleteTransaction,
  } = props;

  const [merchantDesc, setMerchantDesc] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      getMerchants(username, id || '');
      getTransactions(username, { merchantId: id });
    }
  }, [getMerchants, getTransactions, id, username, merchantsList, selectedMerchantTransactions.length]);

  useEffect(() => {
    setMerchantDesc(selectedMerchant.description);
  }, [selectedMerchant]);

  useEffect(() => {
    error && setAlert(ALERT_TYPE_FAILURE, error);
    success && setAlert(ALERT_TYPE_SUCCESS, success);
  }, [error, success, setAlert]);

  const showSelectedMerchantTransactions = useCallback(
    () => (
      <TransactionsList
        transactions={selectedMerchantTransactions}
        username={username}
        deleteTransaction={deleteTransaction}
      />
    ),
    [deleteTransaction, selectedMerchantTransactions, username],
  );

  const showAllMerchants = useCallback(() => {
    resetAlert();
    resetOnPageLeave();
    return navigate('/merchants');
  }, [navigate, resetAlert, resetOnPageLeave]);

  // clear message when leaving the page
  useEffect(() => {
    return () => {
      resetAlert();
      resetOnPageLeave();
    };
  }, [resetAlert, resetOnPageLeave]);

  const showAllTransactions = useCallback(() => {
    return navigate('/transactions');
  }, [navigate]);

  const showAddNewTransaction = useCallback(() => {
    const url = `/transaction/?merchantId=${id}`;
    return navigate(url);
  }, [id, navigate]);

  const showBodyHeader = () => (
    <DisplayCardWrapper>
      <DisplayCardBody background="darkseagreen">
        <HrefLink
          id="one-merchant-all-merchants-link-1"
          linkTo="#"
          title="To All Merchants List"
          onClick={() => showAllMerchants()}
          underline
          color="inherit"
          margin="0px 0px 5px 0px"
        />
        <h4>Merchant Details: {merchantDesc}</h4>
      </DisplayCardBody>
    </DisplayCardWrapper>
  );

  const showLinksBanner = useCallback(
    () => (
      <>
        <HrefLink
          id="one-merchant-all-merchants-link-2"
          linkTo="#"
          title=" [ Show All Merchants ] "
          onClick={() => showAllMerchants()}
          margin="10px 10px 10px 10px"
        />
        <HrefLink
          id="one-merchant-add-txn-link"
          linkTo="#"
          title=" [ Add New Transaction ] "
          onClick={() => showAddNewTransaction()}
          margin="10px 10px 10px 10px"
        />
        <HrefLink
          id="one-merchant-all-txns-link"
          linkTo="#"
          title=" [ Show All Transactions ] "
          onClick={() => showAllTransactions()}
          margin="10px 10px 10px 10px"
        />
      </>
    ),
    [showAddNewTransaction, showAllMerchants, showAllTransactions],
  );

  const merchantNameInput = () => (
    <Input
      className="u-full-width"
      id="one-merchant-name-input"
      label="Merchant Name"
      onChange={(input) => setMerchantDesc(input)}
      value={merchantDesc}
      maxLength={25}
      required
      disabled={selectedMerchant?.notEditable}
    />
  );

  const updateMerchantAction = () => {
    resetAlert();
    updateMerchant(username, id || '', merchantDesc);
  };

  const deleteMerchantActionBegin = () => {
    setIsDeleteModalOpen(true);
  };

  const deleteMerchantActionEnd = () => {
    setIsDeleteModalOpen(false);
    deleteMerchant(username, id || '');
    showAllMerchants();
  };

  const deleteMerchantModal = () => (
    <Modal
      setIsModalOpen={setIsDeleteModalOpen}
      header="Warning"
      body={`Are you sure you want to delete ${merchantDesc}?`}
      primaryButton="Yes"
      primaryButtonAction={() => deleteMerchantActionEnd()}
      secondaryButton="Cancel"
      secondaryButtonAction={() => setIsDeleteModalOpen(false)}
    />
  );

  const updateMerchantButton = () => (
    <Button
      id="one-merchant-button-update"
      title="Update Merchant"
      onClick={() => updateMerchantAction()}
      includeBorder
      disabled={merchantDesc === selectedMerchant.description}
    />
  );

  const deleteMerchantButton = () => (
    <Button
      id="one-merchant-button-delete"
      title="Delete Merchant"
      onClick={() => deleteMerchantActionBegin()}
      includeBorder
      disabled={selectedMerchant?.notEditable}
    />
  );

  const resetMerchantButton = () => (
    <Button
      id="one-merchant-button-reset"
      title="Revert Changes"
      onClick={() => setMerchantDesc(selectedMerchant.description)}
      includeBorder
      disabled={selectedMerchant.description === merchantDesc}
    />
  );

  const showBodyContent = () => (
    <DisplayCardWrapper>
      <DisplayCardBody width="fit-content">
        <DisplayCardRow>{merchantNameInput()}</DisplayCardRow>
        <DisplayCardRow>
          {updateMerchantButton()}
          {deleteMerchantButton()}
          {resetMerchantButton()}
        </DisplayCardRow>
        <DisplayCardRow>{showLinksBanner()}</DisplayCardRow>
      </DisplayCardBody>
    </DisplayCardWrapper>
  );

  return (
    <>
      {showBodyHeader()}
      {showBodyContent()}
      {showSelectedMerchantTransactions()}
      {isDeleteModalOpen && deleteMerchantModal()}
    </>
  );
};

export default OneMerchant;
