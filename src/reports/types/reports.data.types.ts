import { Status } from '../../common/types/common.data.types';
import {
  RefCategory,
  RefCategoryType,
} from '../../common/types/refTypes.data.types';

export interface ReportCurrentBalances {
  totalCash: BigInt;
  accountTypeCashId: string;
  totalCheckingAccounts: BigInt;
  accountTypeCheckingAccountsId: string;
  totalSavingsAccounts: BigInt;
  accountTypeSavingsAccountsId: string;
  totalInvestmentAccounts: BigInt;
  accountTypeInvestmentAccountsId: string;
  totalOtherDepositAccounts: BigInt;
  accountTypeOtherDepositAccountsId: string;
  totalCreditCards: BigInt;
  accountTypeCreditCardsId: string;
  totalLoansAndMortgages: BigInt;
  accountTypeLoansAndMortgagesId: string;
  totalOtherLoanAccounts: BigInt;
  accountTypeOtherLoanAccountsId: string;
  totalAssets: BigInt;
  totalDebts: BigInt;
  netWorth: BigInt;
}

export interface ReportCashFlows {
  month: string;
  monthToSort: number;
  monthBeginDate: string;
  monthEndDate: string;
  totalIncomes: BigInt;
  totalExpenses: BigInt;
  netSavings: BigInt;
}

export interface ReportCategories {
  refCategory: RefCategory;
  totalRefCategory: BigInt;
}

export interface ReportCategoryTypes {
  refCategoryType: RefCategoryType;
  totalRefCategoryType: BigInt;
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
