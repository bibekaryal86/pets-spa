// routes are defined in AppRoutes.tsx
// this is for display in Header or Side Navigation
// publicRoutes is not Used for Display, here for record only

import {
  REPORT_NAME_CASH_FLOWS,
  REPORT_NAME_CATEGORIES,
  REPORT_NAME_CURRENT_BALANCES,
  REPORT_PATH_ALL,
  REPORT_PATH_CASH_FLOWS,
  REPORT_PATH_CATEGORIES,
  REPORT_PATH_CURRENT_BALANCES,
} from '../../common/utils/constants';

const publicRoutes = [{ path: '/' }, { path: '/signout' }];

const protectedRoutes = [
  {
    path: '/summary',
    display: 'Summary',
  },
  {
    path: '/transactions',
    display: 'Transactions',
    submenu: [
      {
        path: '/transaction',
        display: 'Add Transaction',
      },
    ],
  },
  {
    path: '/accounts',
    display: 'Accounts',
  },
  {
    path: '/merchants',
    display: 'Merchants',
  },
  {
    path: REPORT_PATH_ALL,
    display: 'Reports',
    submenu: [
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
];

export { publicRoutes, protectedRoutes };
