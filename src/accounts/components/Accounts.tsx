import {useCallback, useContext, useEffect, useMemo, useReducer, useState,} from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../../app/context/AuthContext';
import HrefLink from '../../common/forms/HrefLink';
import Select, {SelectOptionProps} from '../../common/forms/Select';
import Table from '../../common/forms/Table';
import {RefAccountType, RefBank,} from '../../common/types/refTypes.data.types';
import {ALERT_TYPE_FAILURE, ALERT_TYPE_SUCCESS, SESSION_ACCOUNT_FILTERS,} from '../../common/utils/constants';
import {SessionStorage} from '../../common/utils/sessionStorageHelper';
import {DisplayCardBody, DisplayCardRow, DisplayCardWrapper,} from '../../styles/styled.card.style';
import {clearAccountsFilter, setAccountsFilter,} from '../actions/accounts.state.action';
import accountsStateReducer from '../reducers/accounts.state.reducer';
import {Account, AccountFilters, DefaultAccountsReducerState,} from '../types/accounts.data.types';
import {
    filterAccountBankOptions,
    filterAccountStatusOptions,
    filterAccountTypeOptions,
    getDisplayAccounts,
    getFiltersCurrentlyApplied,
    isAccountFilterApplied,
    numberDollarFormat,
} from '../utils/accounts.utils';

interface AccountsProps {
    error: string;
    success: string;
    accountsList: Account[];
    accountTypes: RefAccountType[];
    banks: RefBank[];
    getAccounts: (username: string) => void;
    setAlert: (type: string, messageKey: string) => void;
    resetAlert: () => void;
    resetOnPageLeave: () => void;
}

const Accounts = (props: AccountsProps): React.ReactElement => {
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
        getAccounts,
        resetAlert,
        resetOnPageLeave,
        setAlert,
    } = props;

    const [accountsState, accountsDispatch] = useReducer(
        accountsStateReducer,
        DefaultAccountsReducerState,
    );

    const clearFilter = useCallback(() => {
        accountsDispatch(clearAccountsFilter());
    }, []);

    useEffect(() => {
        if (username && accountsList.length === 0) {
            getAccounts(username);
        }
    }, [accountsList, getAccounts, username]);

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

    // get filter data from session upon page refresh
    useEffect(() => {
        const accountFilters = SessionStorage.getItem(
            SESSION_ACCOUNT_FILTERS,
        ) as AccountFilters;
        if (isAccountFilterApplied(accountFilters)) {
            accountsDispatch(setAccountsFilter('', '', accountsList));
        }
    }, [accountsList]);

    const {accountFilters, displayAccountsList} = accountsState;

    const isFilterApplied = useMemo(
        () => isAccountFilterApplied(accountFilters),
        [accountFilters],
    );

    const filtersCurrentlyApplied = useMemo(
        () => getFiltersCurrentlyApplied(accountFilters),
        [accountFilters],
    );

    const onChangeFilter = useCallback(
        (selected: string, selectedFilter: string) =>
            accountsDispatch(
                setAccountsFilter(selectedFilter, selected, accountsList),
            ),
        [accountsList],
    );

    const accountsToDisplay = useMemo(
        () =>
            getDisplayAccounts(isFilterApplied, displayAccountsList, accountsList),
        [isFilterApplied, displayAccountsList, accountsList],
    );

    const filterOptions = useCallback(
        (
            filterType: string,
            filterLabel: string,
            filterValue: string,
            filterOptions: SelectOptionProps[],
        ) => (
            <Select
                className="u-full-width"
                id={`filter-account-select-${filterType}`}
                label={filterLabel}
                onChange={(selected) => onChangeFilter(selected, filterType)}
                value={filterValue}
                options={filterOptions}
            />
        ),
        [onChangeFilter],
    );

    const history = useHistory();
    const onClickToAccount = useCallback(
        (id: string) => {
            return history.push(`/account/${id}`);
        },
        [history],
    );

    const tableHeaders = useMemo(
        () => [
            'Bank Name',
            'Account Type',
            'Account Name',
            'Opening Balance',
            'Current Balance',
        ],
        [],
    );

    const tableData = useMemo(() => {
        return Array.from(accountsToDisplay, (x) => {
            return {
                bankName: x.refBank.description,
                accountType: x.refAccountType.description,
                accountName: (
                    <HrefLink
                        id={`accounts-link-to-account-${x.id}`}
                        linkTo="#"
                        title={x.description}
                        onClick={() => onClickToAccount(x.id)}
                    />
                ),
                openingBalance: numberDollarFormat(
                    +x.openingBalance,
                    x.refAccountType.id,
                ),
                currentBalance: numberDollarFormat(
                    +x.currentBalance,
                    x.refAccountType.id,
                ),
            };
        });
    }, [accountsToDisplay, onClickToAccount]);

    const tableFooter = `Number of Records: ${accountsToDisplay.length}`;

    const showBodyHeader = () => (
        <DisplayCardWrapper id="accounts-body-header">
            <DisplayCardBody background="darkseagreen">
                <h4>Accounts</h4>
            </DisplayCardBody>
        </DisplayCardWrapper>
    );

    const showFiltersContent = () => (
        <DisplayCardWrapper id="accounts-filter-content">
            <DisplayCardBody>
                <DisplayCardRow borderBtm fontWeight="bold">
                    Account Filters
                </DisplayCardRow>
                <div className="container">
                    <div className="row">
                        <div className="four columns">
                            <DisplayCardRow>
                                {filterOptions(
                                    'type',
                                    'Account Type',
                                    accountFilters?.accountTypeId || '',
                                    filterAccountTypeOptions(props.accountTypes),
                                )}
                            </DisplayCardRow>
                        </div>
                        <div className="four columns">
                            <DisplayCardRow>
                                {filterOptions(
                                    'bank',
                                    'Bank Name',
                                    accountFilters?.bankId || '',
                                    filterAccountBankOptions(props.banks),
                                )}
                            </DisplayCardRow>
                        </div>
                        <div className="four columns">
                            <DisplayCardRow>
                                {filterOptions(
                                    'status',
                                    'Account Status',
                                    accountFilters?.status || '',
                                    filterAccountStatusOptions(),
                                )}
                            </DisplayCardRow>
                        </div>
                    </div>
                </div>
                <DisplayCardRow borderTop>
                    <HrefLink
                        id="accounts-add-new-account"
                        linkTo="#"
                        title="To Add a New Account Click Here"
                        onClick={() => onClickToAccount('')}
                    />
                </DisplayCardRow>
            </DisplayCardBody>
        </DisplayCardWrapper>
    );

    const showFiltersApplied = () => (
        <DisplayCardWrapper id="accounts-filter-applied">
            <DisplayCardBody>
                <DisplayCardRow fontWeight="bold">
                    {filtersCurrentlyApplied}
                </DisplayCardRow>
                <DisplayCardRow borderTop>
                    <HrefLink
                        id="accounts-clear-filters"
                        linkTo="#"
                        title="Clear Filters and Show All Accounts"
                        onClick={() => clearFilter()}
                        margin="10px 0px 10px 0px"
                    />
                </DisplayCardRow>
            </DisplayCardBody>
        </DisplayCardWrapper>
    );

    const showAccountsList = useCallback(
        () => (
            <Table
                title="List of Accounts"
                headers={tableHeaders}
                data={tableData}
                footer={tableFooter}
                isExportToCsv
                exportToCsvFileName="Selected_Accounts.csv"
                isSortAllowed
            />
        ),
        [tableData, tableFooter, tableHeaders],
    );

    return (
        <>
            {showBodyHeader()}
            {showFiltersContent()}
            {isFilterApplied && showFiltersApplied()}
            {showAccountsList()}
        </>
    );
};

export default Accounts;
