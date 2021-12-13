import AccountsContainer from '../../accounts/components/AccountsContainer';
import OneAccountContainer from '../../accounts/components/OneAccountContainer';
import {
  REPORT_NAME_CASH_FLOWS,
  REPORT_NAME_CATEGORIES,
  REPORT_NAME_CURRENT_BALANCES,
  REPORT_PATH_ALL,
  REPORT_PATH_CASH_FLOWS,
  REPORT_PATH_CATEGORIES,
  REPORT_PATH_CURRENT_BALANCES,
} from '../../common/utils/constants';
import SignInContainer from '../../home/components/SignInContainer';
import SignOutContainer from '../../home/components/SignOutContainer';
import MerchantsContainer from '../../merchants/components/MerchantsContainer';
import OneMerchantContainer from '../../merchants/components/OneMerchantContainer';
import ReportsContainer from '../../reports/components/ReportsContainer';
import Summary from '../../summary/components/Summary';
import OneTransactionContainer from '../../transactions/components/OneTransactionContainer';
import TransactionsContainer from '../../transactions/components/TransactionsContainer';

const publicRoutes = [
  {
    path: '/',
    component: SignInContainer,
  },
  {
    path: '/signout',
    component: SignOutContainer,
  },
];

const protectedRoutes = [
  {
    path: '/summary',
    component: Summary,
    display: 'Summary',
  },
  {
    path: '/transactions',
    component: TransactionsContainer,
    display: 'Transactions',
    submenu: [
      // this is for display only, actual route is set below
      {
        path: '/transaction',
        display: 'Add Transaction',
      },
    ],
  },
  {
    path: '/transaction/:id?',
    component: OneTransactionContainer,
  },
  {
    path: '/accounts',
    component: AccountsContainer,
    display: 'Accounts',
  },
  // there is no display because the link is not displayed in the header
  {
    path: '/account/:id?',
    component: OneAccountContainer,
  },
  {
    path: '/merchants',
    component: MerchantsContainer,
    display: 'Merchants',
  },
  // there is no display because the link is not displayed in the header
  {
    path: '/merchant/:id',
    component: OneMerchantContainer,
  },
  {
    path: REPORT_PATH_ALL,
    component: ReportsContainer,
    display: 'Reports',
    submenu: [
      // this is for display only, actual routes are set below
      {
        path: REPORT_PATH_CURRENT_BALANCES,
        display: REPORT_NAME_CURRENT_BALANCES,
      },
      {
        path: REPORT_PATH_CASH_FLOWS,
        display: REPORT_NAME_CASH_FLOWS,
      },
      {
        path: REPORT_PATH_CATEGORIES,
        display: REPORT_NAME_CATEGORIES,
      },
    ],
  },
  {
    path: REPORT_PATH_CURRENT_BALANCES,
    component: ReportsContainer,
  },
  {
    path: REPORT_PATH_CASH_FLOWS,
    component: ReportsContainer,
  },
  {
    path: REPORT_PATH_CATEGORIES,
    component: ReportsContainer,
  },
];

export { publicRoutes, protectedRoutes };
