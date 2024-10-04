import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import NotFound from './NotFound';
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
import { LocalStorage } from '../../common/utils/localStorageHelper';
import SignInContainer from '../../home/components/SignInContainer';
import SignOutContainer from '../../home/components/SignOutContainer';
import MerchantsContainer from '../../merchants/components/MerchantsContainer';
import OneMerchantContainer from '../../merchants/components/OneMerchantContainer';
import ReportsContainer from '../../reports/components/ReportsContainer';
import Summary from '../../summary/components/Summary';
import OneTransactionContainer from '../../transactions/components/OneTransactionContainer';
import TransactionsContainer from '../../transactions/components/TransactionsContainer';

const AppRoutes = (): React.ReactElement => {
  return (
    <Routes>
      {publicRoutes.map((publicRoute) => (
        <Route key={publicRoute.path} path={publicRoute.path} element={publicRoute.element} />
      ))}
      {protectedRoutes.map((protectedRoute) => (
        <Route key={protectedRoute.path} path={protectedRoute.path} element={getElement(protectedRoute.element)}>
          {protectedRoute.subroutes &&
            protectedRoute.subroutes.map((subroute) => (
              <Route key={subroute.path} path={subroute.path} element={getElement(subroute.element)} />
            ))}
        </Route>
      ))}
      {protectedRoutes.map(
        (protectedRoute) =>
          protectedRoute.submenus &&
          protectedRoute.submenus.map((submenu) => (
            <Route key={submenu.path} path={submenu.path} element={getElement(submenu.element)}>
              {submenu.subroutes &&
                submenu.subroutes.map((subroute) => (
                  <Route key={subroute.path} path={subroute.path} element={getElement(subroute.element)} />
                ))}
            </Route>
          )),
      )}
    </Routes>
  );
};

const getElement = (children: React.ReactElement | undefined) => children && <RequireAuth>{children}</RequireAuth>;

function RequireAuth({ children }: { children: React.ReactElement }) {
  const location = useLocation();
  const isLoggedIn = LocalStorage.getItem('token') as string;
  return isLoggedIn?.length ? children : <Navigate to="/" replace state={{ redirect: location.pathname }} />;
}

const publicRoutes = [
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/',
    element: <SignInContainer />,
  },
  {
    path: '/signout',
    element: <SignOutContainer />,
  },
];

export const protectedRoutes = [
  {
    path: '/summary',
    display: 'Summary',
    element: <Summary />,
  },
  {
    path: '/transactions',
    display: 'Transactions',
    element: <TransactionsContainer />,
    submenus: [
      {
        path: '/transaction',
        display: 'Add Transaction',
        element: <OneTransactionContainer />,
        subroutes: [
          {
            path: ':id',
            element: <OneTransactionContainer />,
          },
        ],
      },
    ],
  },
  {
    path: '/accounts',
    display: 'Accounts',
    element: <AccountsContainer />,
  },
  {
    path: '/account',
    element: <OneAccountContainer />,
    subroutes: [
      {
        path: ':id',
        element: <OneAccountContainer />,
      },
    ],
  },
  {
    path: '/merchants',
    display: 'Merchants',
    element: <MerchantsContainer />,
  },
  {
    path: '/merchant',
    element: <OneMerchantContainer />,
    subroutes: [
      {
        path: ':id',
        element: <OneMerchantContainer />,
      },
    ],
  },
  {
    path: REPORT_PATH_ALL,
    display: 'Reports',
    element: <ReportsContainer />,
    submenus: [
      {
        path: REPORT_PATH_CURRENT_BALANCES,
        display: REPORT_NAME_CURRENT_BALANCES,
        element: <ReportsContainer />,
        subroutes: [],
      },
      {
        path: REPORT_PATH_CASH_FLOWS,
        display: REPORT_NAME_CASH_FLOWS,
        element: <ReportsContainer />,
        subroutes: [],
      },
      {
        path: REPORT_PATH_CATEGORIES,
        display: REPORT_NAME_CATEGORIES,
        element: <ReportsContainer />,
        subroutes: [],
      },
    ],
  },
];

export default AppRoutes;
