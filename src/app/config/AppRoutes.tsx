import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { LocalStorage } from '../../common/utils/localStorageHelper';
import NotFound from '../components/NotFound';
import SignInContainer from '../../home/components/SignInContainer';
import SignOutContainer from '../../home/components/SignOutContainer';
import Summary from '../../summary/components/Summary';
import TransactionsContainer from '../../transactions/components/TransactionsContainer';
import OneTransactionContainer from '../../transactions/components/OneTransactionContainer';
import AccountsContainer from '../../accounts/components/AccountsContainer';
import OneAccountContainer from '../../accounts/components/OneAccountContainer';
import MerchantsContainer from '../../merchants/components/MerchantsContainer';
import OneMerchantContainer from '../../merchants/components/OneMerchantContainer';
import {
  REPORT_PATH_ALL,
  REPORT_PATH_CASH_FLOWS,
  REPORT_PATH_CATEGORIES,
  REPORT_PATH_CURRENT_BALANCES,
} from '../../common/utils/constants';
import ReportsContainer from '../../reports/components/ReportsContainer';

const AppRoutes = (): React.ReactElement => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path={'/'} element={<SignInContainer />} />
      <Route path={'/signout'} element={<SignOutContainer />} />

      <Route path={'/summary'} element={getRequireAuth(<Summary />)} />
      <Route
        path={'/transactions'}
        element={getRequireAuth(<TransactionsContainer />)}
      />
      <Route
        path={'/transaction'}
        element={getRequireAuth(<OneTransactionContainer />)}
      >
        <Route
          path={':id'}
          element={getRequireAuth(<OneTransactionContainer />)}
        />
      </Route>
      <Route
        path={'/accounts'}
        element={getRequireAuth(<AccountsContainer />)}
      />
      <Route
        path={'/account'}
        element={getRequireAuth(<OneAccountContainer />)}
      >
        <Route path={':id'} element={getRequireAuth(<OneAccountContainer />)} />
      </Route>
      <Route
        path={'/merchants'}
        element={getRequireAuth(<MerchantsContainer />)}
      />
      <Route
        path={'/merchant'}
        element={getRequireAuth(<OneMerchantContainer />)}
      >
        <Route
          path={':id'}
          element={getRequireAuth(<OneMerchantContainer />)}
        />
      </Route>
      <Route
        path={REPORT_PATH_ALL}
        element={getRequireAuth(<ReportsContainer />)}
      />
      <Route
        path={REPORT_PATH_CURRENT_BALANCES}
        element={getRequireAuth(<ReportsContainer />)}
      />
      <Route
        path={REPORT_PATH_CASH_FLOWS}
        element={getRequireAuth(<ReportsContainer />)}
      />
      <Route
        path={REPORT_PATH_CATEGORIES}
        element={getRequireAuth(<ReportsContainer />)}
      />
    </Routes>
  );
};

const getRequireAuth = (children: React.ReactElement) => (
  <RequireAuth>{children}</RequireAuth>
);

function RequireAuth({ children }: { children: React.ReactElement }) {
  const location = useLocation();
  const isLoggedIn = LocalStorage.getItem('token') as string;
  return isLoggedIn?.length ? (
    children
  ) : (
    <Navigate to="/" replace state={{ redirect: location.pathname }} />
  );
}

export default AppRoutes;
