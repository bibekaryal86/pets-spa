import {useCallback, useContext, useEffect, useReducer, useState,} from 'react';
import {useParams} from 'react-router';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../../app/context/AuthContext';
import Modal from '../../common/components/Modal';
import Button from '../../common/forms/Button';
import HrefLink from '../../common/forms/HrefLink';
import Input, {InputType} from '../../common/forms/Input';
import Select from '../../common/forms/Select';
import {RefAccountType, RefBank,} from '../../common/types/refTypes.data.types';
import {ALERT_TYPE_FAILURE, ALERT_TYPE_SUCCESS,} from '../../common/utils/constants';
import {DisplayCardBody, DisplayCardRow, DisplayCardWrapper,} from '../../styles/styled.card.style';
import TransactionsList from '../../transactions/components/TransactionsList';
import {Transaction, TransactionFilters,} from '../../transactions/types/transactions.data.types';
import oneAccount from '../reducers/oneAccount.reducer';
import {Account, DefaultAccount} from '../types/accounts.data.types';
import {
    filterAccountBankOptions,
    filterAccountStatusOptions,
    filterAccountTypeOptions,
    handleOneAccountFieldChange,
    numberDollarFormat,
    validateAccount,
} from '../utils/accounts.utils';

export interface OneAccountProps {
    error: string;
    success: string;
    accountsList: Account[];
    selectedAccount: Account;
    selectedAccountTransactions: Transaction[];
    accountTypes: RefAccountType[];
    banks: RefBank[];
    getAccounts: (username: string, selectedAccountId: string) => void;
    updateAccount: (
        username: string,
        id: string,
        account: Account,
        method: string,
    ) => void;
    deleteAccount: (username: string, id: string) => void;
    setAlert: (type: string, messageKey: string) => void;
    resetAlert: () => void;
    resetOnPageLeave: () => void;
    getTransactions: (
        username: string,
        transactionFilters: Partial<TransactionFilters>,
    ) => void;
    deleteTransaction: (username: string, id: string) => void;
}

interface RouteParams {
    id: string;
}

const OneAccount = (props: OneAccountProps): React.ReactElement => {
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
        accountsList,
        selectedAccount,
        selectedAccountTransactions,
        getAccounts,
        updateAccount,
        deleteAccount,
        setAlert,
        resetAlert,
        resetOnPageLeave,
        getTransactions,
        deleteTransaction,
    } = props;

    const [accountData, setAccountData] = useReducer(oneAccount, DefaultAccount);
    const [isValidId, setIsValidId] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const {id} = useParams<RouteParams>();
    const history = useHistory();

    useEffect(() => {
        if (id && id !== ':id') {
            setIsValidId(true);
        } else {
            setIsValidId(false);
        }
    }, [id]);

    useEffect(() => {
        if (username && isValidId) {
            getAccounts(username, id);
            getTransactions(username, {accountId: id});
        }
    }, [
        getAccounts,
        getTransactions,
        id,
        username,
        accountsList,
        isValidId,
        selectedAccountTransactions.length,
    ]);

    useEffect(() => {
        setAccountData({account: selectedAccount});
    }, [selectedAccount]);

    useEffect(() => {
        error && setAlert(ALERT_TYPE_FAILURE, error);
        success && setAlert(ALERT_TYPE_SUCCESS, success);
    }, [error, success, setAlert]);

    // clear message when leaving the page
    useEffect(() => {
        return () => {
            resetAlert();
            resetOnPageLeave();
        };
    }, [resetAlert, resetOnPageLeave]);

    const showAllAccounts = useCallback(() => {
        resetAlert();
        resetOnPageLeave();
        return history.push('/accounts');
    }, [history, resetAlert, resetOnPageLeave]);

    const showAllTransactions = useCallback(() => {
        return history.push('/transactions');
    }, [history]);

    const showAddNewTransaction = useCallback(() => {
        const url = `/transaction/?accountId=${id}`;
        return history.push(url);
    }, [history, id]);

    const showBodyHeader = () => (
        <DisplayCardWrapper id="one-account-body-header">
            <DisplayCardBody background="darkseagreen">
                <HrefLink
                    id="one-account-all-accounts-link-1"
                    linkTo="#"
                    title="To All Accounts List"
                    onClick={() => showAllAccounts()}
                    underline
                    color="inherit"
                    margin="0px 0px 5px 0px"
                />
                <h4>Account Details: {selectedAccount.description}</h4>
            </DisplayCardBody>
        </DisplayCardWrapper>
    );

    const accountNameInput = () => (
        <Input
            className="u-full-width"
            id="one-account-name-input"
            label="Account Name"
            onChange={(event) =>
                handleOneAccountFieldChange(event, 'name', accountData, setAccountData)
            }
            value={accountData.description}
            maxLength={25}
            required
        />
    );

    const accountOpeningBalanceInput = () => (
        <Input
            className="u-full-width"
            id="one-account-opening-balance-input"
            label="Opening Balance (USD)"
            type={InputType.number}
            onChange={(event) =>
                handleOneAccountFieldChange(
                    event,
                    'opening',
                    accountData,
                    setAccountData,
                )
            }
            value={numberDollarFormat(
                +accountData.openingBalance,
                accountData.refAccountType.id,
                true,
            )}
            maxLength={10}
            required
        />
    );

    const accountCurrentBalanceInput = useCallback(
        () => (
            <Input
                className="u-full-width"
                id="one-account-current-balance-input"
                label="Current Balance (USD)"
                onChange={() => null}
                value={numberDollarFormat(
                    +accountData.currentBalance,
                    accountData.refAccountType.id,
                    true,
                )}
                disabled
            />
        ),
        [accountData.currentBalance, accountData.refAccountType.id],
    );

    const accountTypeSelect = () => (
        <Select
            className="u-full-width"
            id="one-account-type-select"
            label="Account Type"
            onChange={(event) =>
                handleOneAccountFieldChange(event, 'type', accountData, setAccountData)
            }
            value={accountData.refAccountType.id}
            options={filterAccountTypeOptions(props.accountTypes)}
            required
        />
    );

    const accountBankSelect = () => (
        <Select
            className="u-full-width"
            id="one-account-bank-select"
            label="Bank Name"
            onChange={(event) =>
                handleOneAccountFieldChange(event, 'bank', accountData, setAccountData)
            }
            value={accountData.refBank.id}
            options={filterAccountBankOptions(props.banks)}
            required
        />
    );

    const accountStatusSelect = () => (
        <Select
            className="u-full-width"
            id="one-account-status-select"
            label="Account Status"
            onChange={(event) =>
                handleOneAccountFieldChange(
                    event,
                    'status',
                    accountData,
                    setAccountData,
                )
            }
            value={accountData.status}
            options={filterAccountStatusOptions()}
            required
        />
    );

    const updateAccountAction = (method: string) => {
        const isInvalid = validateAccount(accountData);
        if (isInvalid) {
            const errMsg =
                'Invalid Input! Required field ' +
                isInvalid +
                ' not provided!! Please Try Again!!!';
            setAlert(ALERT_TYPE_FAILURE, errMsg);
        } else {
            resetAlert();
            updateAccount(username, accountData.id, accountData, method);
            if (method === 'POST') {
                showAllAccounts();
            }
        }
    };

    const deleteAccountActionBegin = () => {
        setIsDeleteModalOpen(true);
    };

    const deleteAccountActionEnd = (accountId: string) => {
        setIsDeleteModalOpen(false);
        deleteAccount(username, accountId);
        showAllAccounts();
    };

    const deleteModalBody = () => (
        <>
            <p>
                Are you sure you want to delete the account: {accountData.description}?
            </p>
            <p>This will also delete all transactions for this account!!</p>
            <p>This action cannot be undone!!!</p>
        </>
    );

    const deleteAccountModal = () => (
        <Modal
            setIsModalOpen={setIsDeleteModalOpen}
            header="Warning"
            body={deleteModalBody()}
            primaryButton="Yes"
            primaryButtonAction={() => deleteAccountActionEnd(accountData.id)}
            secondaryButton="Cancel"
            secondaryButtonAction={() => setIsDeleteModalOpen(false)}
        />
    );

    const isUpdateResetDisabled = () =>
        selectedAccount.description === accountData.description &&
        selectedAccount.openingBalance === accountData.openingBalance &&
        selectedAccount.refAccountType.id === accountData.refAccountType.id &&
        selectedAccount.refBank.id === accountData.refBank.id &&
        selectedAccount.status === accountData.status;

    const addAccountButton = () => (
        <Button
            id="one-account-button-add"
            title="Add Account"
            onClick={() => updateAccountAction('POST')}
            includeBorder
            disabled={isUpdateResetDisabled()}
        />
    );

    const updateAccountButton = () => (
        <Button
            id="one-account-button-update"
            title="Update Account"
            onClick={() => updateAccountAction('PUT')}
            includeBorder
            disabled={isUpdateResetDisabled()}
        />
    );

    const deleteAccountButton = () => (
        <Button
            id="one-account-button-delete"
            title="Delete Account"
            onClick={() => deleteAccountActionBegin()}
            includeBorder
        />
    );

    const resetAccountButton = () => (
        <Button
            id="one-account-button-reset"
            title="Revert Changes"
            onClick={() => setAccountData({account: selectedAccount})}
            includeBorder
            disabled={isUpdateResetDisabled()}
        />
    );

    const addButtons = () => (
        <>
            {addAccountButton()}
            {resetAccountButton()}
        </>
    );

    const updateButtons = () => (
        <>
            {updateAccountButton()}
            {deleteAccountButton()}
            {resetAccountButton()}
        </>
    );

    const showLinksBanner = useCallback(
        () => (
            <>
                <HrefLink
                    id="one-account-all-accounts-link-2"
                    linkTo="#"
                    title=" [ Show All Accounts ] "
                    onClick={() => showAllAccounts()}
                    margin="0px 10px 0px 10px"
                />
                <HrefLink
                    id="one-account-add-txn-link"
                    linkTo="#"
                    title=" [ Add New Transaction ] "
                    onClick={() => showAddNewTransaction()}
                    margin="0px 10px 0px 10px"
                />
                <HrefLink
                    id="one-account-all-txns-link"
                    linkTo="#"
                    title=" [ Show All Transactions ] "
                    onClick={() => showAllTransactions()}
                    margin="0px 10px 0px 10px"
                />
            </>
        ),
        [showAddNewTransaction, showAllAccounts, showAllTransactions],
    );

    const showBodyContent = () => (
        <DisplayCardWrapper id="one-account-body-content">
            <DisplayCardBody>
                <div className="container">
                    <DisplayCardRow>
                        <div className="row">
                            <div className="four columns">{accountNameInput()}</div>
                            <div className="four columns">{accountOpeningBalanceInput()}</div>
                            <div className="four columns">{accountCurrentBalanceInput()}</div>
                        </div>
                    </DisplayCardRow>
                    <DisplayCardRow>
                        <div className="row">
                            <div className="four columns">{accountTypeSelect()}</div>
                            <div className="four columns">{accountBankSelect()}</div>
                            <div className="four columns">{accountStatusSelect()}</div>
                        </div>
                    </DisplayCardRow>
                    <DisplayCardRow>
                        <div className="row">
                            <div className="twelve columns">
                                {isValidId ? updateButtons() : addButtons()}
                            </div>
                        </div>
                    </DisplayCardRow>
                    <DisplayCardRow>
                        <div className="row">
                            <div className="twelve columns">{showLinksBanner()}</div>
                        </div>
                    </DisplayCardRow>
                </div>
            </DisplayCardBody>
        </DisplayCardWrapper>
    );

    const showSelectedAccountTransactions = useCallback(
        () => (
            <TransactionsList
                transactions={selectedAccountTransactions}
                selectedAccountId={id}
                username={username}
                deleteTransaction={deleteTransaction}
            />
        ),
        [deleteTransaction, id, selectedAccountTransactions, username],
    );

    return (
        <>
            {showBodyHeader()}
            {showBodyContent()}
            {showSelectedAccountTransactions()}
            {isDeleteModalOpen && deleteAccountModal()}
        </>
    );
};

export default OneAccount;
