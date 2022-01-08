import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../common/components/Modal';
import Button from '../../common/forms/Button';
import HrefLink from '../../common/forms/HrefLink';
import Table from '../../common/forms/Table';
import { Transaction } from '../types/transactions.data.types';
import { transactionsListNumberFormatter } from '../utils/transactions.utils';

interface TransactionsListProps {
  transactions: Transaction[];
  selectedAccountId?: string;
  username: string;
  deleteTransaction: (username: string, id: string) => void;
}

interface DeleteTransaction {
  id: string;
  date: string;
}

const DefaultDeleteTransaction: DeleteTransaction = {
  id: '',
  date: '',
};

const TransactionsList = (props: TransactionsListProps): React.ReactElement => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [txnToDelete, setTxnToDelete] = useState(DefaultDeleteTransaction);

  const { transactions, selectedAccountId, username, deleteTransaction } = props;

  const tableHeaders = useMemo(
    () => ['Date', 'Category', 'Account', 'Transfer To', 'Merchant', 'Amount', 'Actions'],
    [],
  );

  const tableFooter = `Number of Records: ${transactions.length}`;

  const onClickToAccount = useCallback(
    (id: string) => {
      return navigate(`/account/${id}`);
    },
    [navigate],
  );

  const onClickToMerchant = useCallback(
    (id: string) => {
      return navigate(`/merchant/${id}`);
    },
    [navigate],
  );

  const onClickToTransaction = useCallback(
    (id: string) => {
      return navigate(`/transaction/${id}`);
    },
    [navigate],
  );

  const deleteTransactionModal = () => (
    <Modal
      setIsModalOpen={setIsDeleteModalOpen}
      header="Warning"
      body={`Are you sure you want to delete this transaction from date ${txnToDelete.date}?`}
      primaryButton="Yes"
      primaryButtonAction={() => deleteTransactionActionEnd()}
      secondaryButton="Cancel"
      secondaryButtonAction={() => setIsDeleteModalOpen(false)}
    />
  );

  const deleteTransactionActionBegin = (id: string, date: string) => {
    setIsDeleteModalOpen(true);
    setTxnToDelete({ id, date });
  };

  const deleteTransactionActionEnd = () => {
    setIsDeleteModalOpen(false);
    deleteTransaction(username, txnToDelete.id);
  };

  const buttons = useCallback(
    (id: string, date: string) => (
      <>
        <Button id={`txn-list-button-view-${id}`} title="View" onClick={() => onClickToTransaction(id)} includeBorder />
        <Button
          id={`txn-list-button-delete-${id}`}
          title="Delete"
          onClick={() => deleteTransactionActionBegin(id, date)}
          includeBorder
        />
      </>
    ),
    [onClickToTransaction],
  );

  const tableData = useMemo(() => {
    return Array.from(transactions, (x) => {
      return {
        date: x.date,
        category: x.refCategory.description,
        account: (
          <HrefLink
            id={`${x.id}_${x.account.id}`}
            linkTo="#"
            title={x.account.description}
            onClick={() => onClickToAccount(x.account.id)}
          />
        ),
        trfAccount: (
          <HrefLink
            id={`${x.id}_${x.trfAccount?.id}`}
            linkTo="#"
            title={x.trfAccount?.description}
            onClick={() => onClickToAccount(x.trfAccount?.id)}
          />
        ),
        merchant: (
          <HrefLink
            id={`${x.id}_${x.refMerchant.id}`}
            linkTo="#"
            title={x.refMerchant.description}
            onClick={() => onClickToMerchant(x.refMerchant.id)}
          />
        ),
        amount: transactionsListNumberFormatter(
          +x.amount,
          x.refTransactionType.id,
          x.trfAccount?.id,
          selectedAccountId,
        ),
        actions: buttons(x.id, x.date),
      };
    });
  }, [buttons, onClickToAccount, onClickToMerchant, selectedAccountId, transactions]);

  const showTransactionsList = useCallback(
    () => (
      <Table
        title="List of Transactions"
        headers={tableHeaders}
        data={tableData}
        footer={tableFooter}
        isExportToCsv
        exportToCsvFileName="Selected_Transactions.csv"
        isSortAllowed
      />
    ),
    [tableData, tableFooter, tableHeaders],
  );

  return (
    <>
      {showTransactionsList()}
      {isDeleteModalOpen && deleteTransactionModal()}
    </>
  );
};

export default TransactionsList;
