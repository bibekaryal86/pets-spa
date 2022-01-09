import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReportCurrentBalances } from '../types/reports.data.types';
import Table from '../../common/forms/Table';
import { numberFormatter } from '../../accounts/utils/accounts.utils';
import HrefLink from '../../common/forms/HrefLink';
import { SessionStorage } from '../../common/utils/sessionStorageHelper';
import { SESSION_ACCOUNT_FILTERS } from '../../common/utils/constants';

interface ReportCurrentBalancesProps {
  report: ReportCurrentBalances[];
}

export const CurrentBalancesReport = (props: ReportCurrentBalancesProps): React.ReactElement => {
  const navigate = useNavigate();
  const onClickToAccounts = (accountTypeId: string) => {
    SessionStorage.setItem(SESSION_ACCOUNT_FILTERS, {
      accountTypeId,
    });
    navigate('/accounts');
  };

  const getAssets = () => {
    return (
      <>
        <div>
          <HrefLink
            id="current-balance-report-cash-id"
            linkTo="#"
            title="Cash:"
            margin="0 5px 0 0"
            onClick={() => onClickToAccounts(props.report?.[0]?.accountTypeCashId)}
          />
          {numberFormatter(+props.report?.[0]?.totalCash)}
        </div>
        <div>
          <HrefLink
            id="current-balance-report-checking-accounts-id"
            linkTo="#"
            title="Checking Accounts:"
            margin="0 5px 0 0"
            onClick={() => onClickToAccounts(props.report?.[0]?.accountTypeCheckingAccountsId)}
          />
          {numberFormatter(+props.report?.[0]?.totalCheckingAccounts)}
        </div>
        <div>
          <HrefLink
            id="current-balance-report-savings-accounts-id"
            linkTo="#"
            title="Savings Accounts:"
            margin="0 5px 0 0"
            onClick={() => onClickToAccounts(props.report?.[0]?.accountTypeSavingsAccountsId)}
          />
          {numberFormatter(+props.report?.[0]?.totalSavingsAccounts)}
        </div>
        <div>
          <HrefLink
            id="current-balance-report-investment-accounts-id"
            linkTo="#"
            title="Investment Accounts:"
            margin="0 5px 0 0"
            onClick={() => onClickToAccounts(props.report?.[0]?.accountTypeInvestmentAccountsId)}
          />
          {numberFormatter(+props.report?.[0]?.totalInvestmentAccounts)}
        </div>
        <div>
          <HrefLink
            id="current-balance-report-other-deposit-accounts-id"
            linkTo="#"
            title="Other Deposit Accounts:"
            margin="0 5px 0 0"
            onClick={() => onClickToAccounts(props.report?.[0]?.accountTypeOtherDepositAccountsId)}
          />
          {numberFormatter(+props.report?.[0]?.totalOtherDepositAccounts)}
        </div>
      </>
    );
  };

  const getDebts = () => {
    return (
      <>
        <div>
          <HrefLink
            id="current-balance-report-credit-cards-id"
            linkTo="#"
            title="Credit Cards:"
            margin="0 5px 0 0"
            onClick={() => onClickToAccounts(props.report?.[0]?.accountTypeCreditCardsId)}
          />
          {numberFormatter(+props.report?.[0]?.totalCreditCards)}
        </div>
        <div>
          <HrefLink
            id="current-balance-report-loans-and-mortgages-id"
            linkTo="#"
            title="Loans and Mortgages:"
            margin="0 5px 0 0"
            onClick={() => onClickToAccounts(props.report?.[0]?.accountTypeLoansAndMortgagesId)}
          />
          {numberFormatter(+props.report?.[0]?.totalLoansAndMortgages)}
        </div>
        <div>
          <HrefLink
            id="current-balance-report-other-loan-accounts-id"
            linkTo="#"
            title="Other Loan Accounts:"
            margin="0 5px 0 0"
            onClick={() => onClickToAccounts(props.report?.[0]?.accountTypeOtherLoanAccountsId)}
          />
          {numberFormatter(+props.report?.[0]?.totalOtherLoanAccounts)}
        </div>
      </>
    );
  };

  const getTotalAssets = () => {
    return <>Total Assets: {numberFormatter(+props.report[1]?.totalAssets)}</>;
  };
  const getTotalDebts = () => {
    return <>Total Debts: {numberFormatter(+props.report[1]?.totalDebts)}</>;
  };
  const getNetWorth = () => {
    return <>Net Worth: {numberFormatter(+props.report[1]?.netWorth)}</>;
  };

  const tableHeaders = ['Assets', 'Debts', 'Net Worth'];
  const tableData = [
    {
      assets: getAssets(),
      debts: getDebts(),
      netWorth: <></>,
    },
  ];
  const tableFooter = [
    {
      assets: getTotalAssets(),
      debts: getTotalDebts(),
      netWorth: getNetWorth(),
    },
  ];

  return (
    <Table title="Current Balances" headers={tableHeaders} data={tableData} footer={tableFooter} verticalAlign="top" />
  );
};
