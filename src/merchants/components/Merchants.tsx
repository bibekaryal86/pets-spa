import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../app/context/AuthContext';
import Modal from '../../common/components/Modal';
import Button from '../../common/forms/Button';
import HrefLink from '../../common/forms/HrefLink';
import Input from '../../common/forms/Input';
import Table from '../../common/forms/Table';
import { ALERT_TYPE_FAILURE, ALERT_TYPE_SUCCESS } from '../../common/utils/constants';
import { DisplayCardBody, DisplayCardRow, DisplayCardWrapper } from '../../styles/styled.card.style';
import {
  clearMerchantsFilter,
  closeModals,
  setIsDeleteModal,
  setIsUpdateModal,
  setMerchantInAction,
  setMerchantNameBeginsWithFilter,
  setMerchantsNotUsedInTxnsOnly,
  setModalInputs,
} from '../actions/merchants.state.action';
import merchantsStateReducer from '../reducers/merchants.state.reducer';
import { DefaultMerchantsReducerState, Merchant } from '../types/merchants.data.types';

interface MerchantsProps {
  error: string;
  success: string;
  merchantsList: Merchant[];
  merchantsFiltersList: string[];
  merchantsNotUsedInTxnsList: Merchant[];
  getMerchants: (username: string) => void;
  updateMerchant: (username: string, id: string, description: string) => void;
  deleteMerchant: (username: string, id: string) => void;
  setAlert: (type: string, messageKey: string) => void;
  resetAlert: () => void;
  resetOnPageLeave: () => void;
}

const Merchants = (props: MerchantsProps): React.ReactElement => {
  const [merchantState, merchantsDispatch] = useReducer(merchantsStateReducer, DefaultMerchantsReducerState);

  const {
    error,
    success,
    merchantsList,
    merchantsFiltersList,
    merchantsNotUsedInTxnsList,
    getMerchants,
    deleteMerchant,
    updateMerchant,
    setAlert,
    resetAlert,
    resetOnPageLeave,
  } = props;

  const {
    merchantInActionId,
    merchantInActionDesc,
    merchantNameBeginsWith,
    displayMerchantsList,
    showNotUsedInTxnsOnly,
    isDeleteModalOpen,
    isUpdateModalOpen,
    modalInput,
  } = merchantState;

  const [username, setUsername] = useState('');
  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (authContext.auth && authContext.auth.isLoggedIn) {
      setUsername(authContext.auth.userDetails.username);
    } else {
      setUsername('');
    }
  }, [authContext]);

  useEffect(() => {
    if (username && merchantsList.length === 0) {
      getMerchants(username);
    }
  }, [username, merchantsList, getMerchants]);

  const clearFilter = useCallback(() => {
    merchantsDispatch(clearMerchantsFilter());
  }, []);

  useEffect(() => {
    error && setAlert(ALERT_TYPE_FAILURE, error);

    if (success) {
      setAlert(ALERT_TYPE_SUCCESS, success);
      clearFilter();
    }
  }, [error, success, setAlert, clearFilter]);

  // clear message when leaving the page
  useEffect(() => {
    return () => {
      resetAlert();
      resetOnPageLeave();
    };
  }, [resetAlert, resetOnPageLeave]);

  const filterMerchantsNameBeginsWith = (firstChar: string) =>
    merchantsDispatch(setMerchantNameBeginsWithFilter(firstChar, merchantsList));

  const filterMerchantsNotUsedInTxnsOnly = () =>
    merchantsDispatch(setMerchantsNotUsedInTxnsOnly(merchantsNotUsedInTxnsList));

  const getMerchantsNameBeginsWith = () =>
    merchantsFiltersList.map((merchantsFilter) => {
      return (
        <Button
          key={merchantsFilter}
          id={merchantsFilter}
          title={merchantsFilter}
          onClick={() => filterMerchantsNameBeginsWith(merchantsFilter)}
        />
      );
    });

  const getMerchantsNotUsedInTransactions = () => (
    <HrefLink
      id="merchants-not-used-in-txns"
      linkTo="#"
      title="Only Show Merchants Not Used In Any Transactions"
      onClick={() => filterMerchantsNotUsedInTxnsOnly()}
      margin="10px 0px 10px 0px"
    />
  );

  const setIsUpdateModalOpen = (isOpen: boolean) => merchantsDispatch(setIsUpdateModal(isOpen));

  const setIsDeleteModalOpen = (isOpen: boolean) => merchantsDispatch(setIsDeleteModal(isOpen));

  const buttons = (id: string, description: string, notEditable: boolean) => (
    <>
      <Button
        id={`UPDATE_MERCHANT_${id}`}
        title="Click Here to Rename"
        includeBorder
        disabled={notEditable}
        onClick={() => {
          setIsUpdateModalOpen(true);
          merchantsDispatch(setMerchantInAction(id, description));
        }}
      />
      <Button
        id={`DELETE_MERCHANT_${id}`}
        title="Click Here to Delete"
        includeBorder
        disabled={notEditable}
        onClick={() => {
          setIsDeleteModalOpen(true);
          merchantsDispatch(setMerchantInAction(id, description));
        }}
      />
    </>
  );

  const closeModal = () => merchantsDispatch(closeModals());

  const doUpdateMerchant = useCallback(
    (id: string, newDescription: string) => {
      closeModal();
      updateMerchant(username, id, newDescription);
    },
    [updateMerchant, username],
  );

  const doDeleteMerchant = useCallback(
    (id: string) => {
      closeModal();
      deleteMerchant(username, id);
    },
    [username, deleteMerchant],
  );

  const merchantsListToDisplay: Merchant[] =
    merchantNameBeginsWith || showNotUsedInTxnsOnly ? displayMerchantsList : merchantsList;

  const filtersCurrentlyApplied = () => {
    const filterText = merchantNameBeginsWith
      ? `[Merchant Name Begins With: ${merchantNameBeginsWith}]`
      : showNotUsedInTxnsOnly
      ? '[Merchant Not Used Transactions]'
      : '';
    if (filterText) {
      return 'Filters Currently Applied: ' + filterText;
    } else {
      return '';
    }
  };

  const navigate = useNavigate();
  const onClickToMerchant = useCallback(
    (id: string) => {
      return navigate(`/merchant/${id}`);
    },
    [navigate],
  );

  const headers = ['Merchant Name', 'Actions'];
  const footer = `Number of Records: ${merchantsListToDisplay.length}`;
  const data = Array.from(merchantsListToDisplay, (x) => {
    return {
      description: <HrefLink id={x.id} linkTo="#" title={x.description} onClick={() => onClickToMerchant(x.id)} />,
      actions: buttons(x.id, x.description, x.notEditable),
    };
  });

  const setModalInput = (value: string) => merchantsDispatch(setModalInputs(value));

  const updateModalBody = () => (
    <>
      <Input
        id="merchant-update-modal--input-id"
        label={`Enter new name for: ${merchantInActionDesc}`}
        onChange={(value) => setModalInput(value)}
        value={modalInput}
      />
    </>
  );

  const updateModal = () => (
    <Modal
      setIsModalOpen={setIsUpdateModalOpen}
      header="Warning"
      body={updateModalBody()}
      primaryButton="Rename"
      primaryButtonAction={() => doUpdateMerchant(merchantInActionId, modalInput)}
      secondaryButton="Cancel"
      secondaryButtonAction={closeModal}
    />
  );

  const deleteModal = () => (
    <Modal
      setIsModalOpen={setIsDeleteModalOpen}
      header="Warning"
      body={`Are you sure you want to delete ${merchantInActionDesc}?`}
      primaryButton="Yes"
      primaryButtonAction={() => doDeleteMerchant(merchantInActionId)}
      secondaryButton="Cancel"
      secondaryButtonAction={closeModal}
    />
  );

  const showBodyHeader = () => (
    <DisplayCardWrapper>
      <DisplayCardBody background="darkseagreen">
        <h4>Merchants</h4>
      </DisplayCardBody>
    </DisplayCardWrapper>
  );

  const showMerchantFilters = () => (
    <DisplayCardWrapper>
      <DisplayCardBody>
        <DisplayCardRow borderBtm fontWeight="bold">
          Merchants Name Begins With
        </DisplayCardRow>
        <DisplayCardRow borderTop>{getMerchantsNameBeginsWith()}</DisplayCardRow>
        <DisplayCardRow borderTop>{getMerchantsNotUsedInTransactions()}</DisplayCardRow>
      </DisplayCardBody>
    </DisplayCardWrapper>
  );

  const showFiltersApplied = () => (
    <DisplayCardWrapper>
      <DisplayCardBody>
        <DisplayCardRow fontWeight="bold">{filtersCurrentlyApplied()}</DisplayCardRow>
        <DisplayCardRow borderTop>
          <HrefLink
            id="merchants-clear-filters"
            linkTo="#"
            title="Clear Filters and Show All Merchants"
            onClick={() => clearFilter()}
            margin="10px 0px 10px 0px"
          />
        </DisplayCardRow>
      </DisplayCardBody>
    </DisplayCardWrapper>
  );

  const showMerchantsList = () => (
    <Table
      title="List of Merchants"
      headers={headers}
      data={data}
      footer={footer}
      isExportToCsv
      exportToCsvFileName="Selected_Merchants.csv"
      isSortAllowed
    />
  );

  return (
    <>
      {showBodyHeader()}
      {merchantsFiltersList?.length && showMerchantFilters()}
      {filtersCurrentlyApplied() && showFiltersApplied()}
      {merchantsListToDisplay && showMerchantsList()}
      {isDeleteModalOpen && deleteModal()}
      {isUpdateModalOpen && updateModal()}
    </>
  );
};

export default Merchants;
