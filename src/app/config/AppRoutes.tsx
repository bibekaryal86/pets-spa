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

      <Route
        path={'/summary'}
        element={
          <RequireAuth>
            <Summary />
          </RequireAuth>
        }
      />
      <Route
        path={'/transactions'}
        element={
          <RequireAuth>
            <TransactionsContainer />
          </RequireAuth>
        }
      />
      <Route
        path={'/transaction'}
        element={
          <RequireAuth>
            <OneTransactionContainer />
          </RequireAuth>
        }
      >
        <Route
          path={':id'}
          element={
            <RequireAuth>
              <OneTransactionContainer />
            </RequireAuth>
          }
        />
      </Route>
      <Route
        path={'/accounts'}
        element={
          <RequireAuth>
            <AccountsContainer />
          </RequireAuth>
        }
      />
      <Route
        path={'/account'}
        element={
          <RequireAuth>
            <OneAccountContainer />
          </RequireAuth>
        }
      >
        <Route
          path={':id'}
          element={
            <RequireAuth>
              <OneAccountContainer />
            </RequireAuth>
          }
        />
      </Route>
      <Route
        path={'/merchants'}
        element={
          <RequireAuth>
            <MerchantsContainer />
          </RequireAuth>
        }
      />
      <Route
        path={'/merchant'}
        element={
          <RequireAuth>
            <OneMerchantContainer />
          </RequireAuth>
        }
      >
        <Route
          path={':id'}
          element={
            <RequireAuth>
              <OneMerchantContainer />
            </RequireAuth>
          }
        />
      </Route>
      <Route
        path={REPORT_PATH_ALL}
        element={
          <RequireAuth>
            <ReportsContainer />
          </RequireAuth>
        }
      />
      <Route
        path={REPORT_PATH_CURRENT_BALANCES}
        element={
          <RequireAuth>
            <ReportsContainer />
          </RequireAuth>
        }
      />
      <Route
        path={REPORT_PATH_CASH_FLOWS}
        element={
          <RequireAuth>
            <ReportsContainer />
          </RequireAuth>
        }
      />
      <Route
        path={REPORT_PATH_CATEGORIES}
        element={
          <RequireAuth>
            <ReportsContainer />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

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
