import { Status } from '../../common/types/common.data.types';
import { RefCategory, RefCategoryType } from '../../common/types/refTypes.data.types';

export interface ReportCurrentBalances {
  totalCash: bigint;
  accountTypeCashId: string;
  totalCheckingAccounts: bigint;
  accountTypeCheckingAccountsId: string;
  totalSavingsAccounts: bigint;
  accountTypeSavingsAccountsId: string;
  totalInvestmentAccounts: bigint;
  accountTypeInvestmentAccountsId: string;
  totalOtherDepositAccounts: bigint;
  accountTypeOtherDepositAccountsId: string;
  totalCreditCards: bigint;
  accountTypeCreditCardsId: string;
  totalLoansAndMortgages: bigint;
  accountTypeLoansAndMortgagesId: string;
  totalOtherLoanAccounts: bigint;
  accountTypeOtherLoanAccountsId: string;
  totalAssets: bigint;
  totalDebts: bigint;
  netWorth: bigint;
}

export interface ReportCashFlows {
  month: string;
  monthToSort: number;
  monthBeginDate: string;
  monthEndDate: string;
  totalIncomes: bigint;
  totalExpenses: bigint;
  netSavings: bigint;
}

export interface ReportCategories {
  refCategory: RefCategory;
  totalRefCategory: bigint;
}

export interface ReportCategoryTypes {
  refCategoryType: RefCategoryType;
  totalRefCategoryType: bigint;
  reportCategories: ReportCategories[];
}

export interface ReportsResponse {
  reportCurrentBalances: ReportCurrentBalances[];
  reportCashFlows: ReportCashFlows[];
  reportCategoryTypes: ReportCategoryTypes[];
  status: Status;
}

export const DefaultReportsResponse: ReportsResponse = {
  reportCurrentBalances: [],
  reportCashFlows: [],
  reportCategoryTypes: [],
  status: {
    errMsg: '',
  },
};
