import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../app/context/AuthContext';
import HrefLink from '../../common/forms/HrefLink';
import Select from '../../common/forms/Select';
import {
  ALERT_TYPE_FAILURE,
  REPORT_NAME_CASH_FLOWS,
  REPORT_NAME_CATEGORIES,
  REPORT_NAME_CURRENT_BALANCES,
  REPORT_PATH_ALL,
  REPORT_PATH_CASH_FLOWS,
  REPORT_PATH_CATEGORIES,
  REPORT_PATH_CURRENT_BALANCES,
} from '../../common/utils/constants';
import {
  DisplayCardBody,
  DisplayCardRow,
  DisplayCardWrapper,
} from '../../styles/styled.card.style';
import { getCashFlowsReport } from '../actions/getCashFlowsReport.action';
import { getCategoriesReport } from '../actions/getCategoriesReport.action';
import { getCurrentBalancesReport } from '../actions/getCurrentBalancesReport.action';
import { DefaultReportsResponse } from '../types/reports.data.types';
import { yearsDropdownForReports } from '../utils/reports.utils';
import { CashFlowsReport } from './ReportCashFlows';
import { CategoriesReport } from './ReportCategories';
import { CurrentBalancesReport } from './ReportCurrentBalances';

interface ReportsProps {
  setAlert: (type: string, messageKey: string) => void;
  resetAlert: () => void;
  setSpinner: () => void;
  resetSpinner: () => void;
}

const Reports = (props: ReportsProps): React.ReactElement => {
  const [username, setUsername] = useState('');
  const authContext = useContext(AuthContext);
  useEffect(() => {
    if (authContext.auth && authContext.auth.isLoggedIn) {
      setUsername(authContext.auth.userDetails.username);
    } else {
      setUsername('');
    }
  }, [authContext]);

  const { resetAlert, resetSpinner, setAlert, setSpinner } = props;
  const currentYear = new Date().getFullYear();
  const [selectedReport, setSelectedReport] = useState('');
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [errMsg, setErrMsg] = useState('');
  const [cashFlowsReport, setCashFlowsReport] = useState(
    DefaultReportsResponse.reportCashFlows,
  );
  const [currentBalancesReport, setCurrentBalancesReport] = useState(
    DefaultReportsResponse.reportCurrentBalances,
  );
  const [categoriesReport, setCategoriesReport] = useState(
    DefaultReportsResponse.reportCategoryTypes,
  );

  const setCashFlowsReportData = async () => {
    setSpinner();
    const reportsResponse = await getCashFlowsReport(username, selectedYear);
    if (reportsResponse.status && reportsResponse.status.errMsg) {
      setErrMsg(reportsResponse.status.errMsg);
    } else {
      setCashFlowsReport(reportsResponse.reportCashFlows);
    }
    resetSpinner();
  };

  const setCurrentBalancesReportData = async () => {
    setSpinner();
    const reportsResponse = await getCurrentBalancesReport(username);
    if (reportsResponse.status && reportsResponse.status.errMsg) {
      setErrMsg(reportsResponse.status.errMsg);
    } else {
      setCurrentBalancesReport(reportsResponse.reportCurrentBalances);
    }
    resetSpinner();
  };

  const setCategoriesReportData = async () => {
    setSpinner();
    const reportsResponse = await getCategoriesReport(username, selectedYear);
    if (reportsResponse.status && reportsResponse.status.errMsg) {
      setErrMsg(reportsResponse.status.errMsg);
    } else {
      setCategoriesReport(reportsResponse.reportCategoryTypes);
    }
    resetSpinner();
  };

  const setAllReports = () => {
    setCashFlowsReportData();
    setCurrentBalancesReportData();
    setCategoriesReportData();
  };

  useEffect(() => {
    if (username) {
      switch (window.location.pathname) {
        case REPORT_PATH_ALL:
          setSelectedReport('');
          setAllReports();
          break;
        case REPORT_PATH_CASH_FLOWS:
          setSelectedReport(REPORT_NAME_CASH_FLOWS);
          setCashFlowsReportData();
          break;
        case REPORT_PATH_CURRENT_BALANCES:
          setSelectedReport(REPORT_NAME_CURRENT_BALANCES);
          setCurrentBalancesReportData();
          break;
        case REPORT_PATH_CATEGORIES:
          setSelectedReport(REPORT_NAME_CATEGORIES);
          setCategoriesReportData();
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedReport, selectedYear, username]);

  useEffect(() => {
    errMsg && setAlert(ALERT_TYPE_FAILURE, errMsg);
  }, [errMsg, setAlert]);

  useEffect(() => {
    return () => {
      resetAlert();
    };
  }, [resetAlert]);

  const showYearSelectOptions = useCallback(
    () =>
      (selectedReport === REPORT_NAME_CASH_FLOWS ||
        selectedReport === REPORT_NAME_CATEGORIES) && (
        <DisplayCardWrapper>
          <DisplayCardBody>
            <DisplayCardRow>
              <Select
                id="filter-report-select-year"
                label="Select Year"
                onChange={(selected) => setSelectedYear(+selected)}
                value={selectedYear.toString()}
                options={yearsDropdownForReports()}
              />
              {selectedYear !== currentYear && (
                <HrefLink
                  id="report-link-current-year"
                  linkTo="#"
                  title="Go to Current Year Report"
                  onClick={() => setSelectedYear(currentYear)}
                />
              )}
            </DisplayCardRow>
          </DisplayCardBody>
        </DisplayCardWrapper>
      ),
    [currentYear, selectedReport, selectedYear],
  );

  const showBodyHeader = () => (
    <DisplayCardWrapper>
      <DisplayCardBody background="darkseagreen">
        <h4>Reports {selectedReport ? `: ${selectedReport}` : ''}</h4>
      </DisplayCardBody>
    </DisplayCardWrapper>
  );

  const showSpecificReport = () =>
    selectedReport === REPORT_NAME_CURRENT_BALANCES ? (
      <CurrentBalancesReport report={currentBalancesReport} />
    ) : selectedReport === REPORT_NAME_CASH_FLOWS ? (
      <CashFlowsReport report={cashFlowsReport} selectedYear={selectedYear} />
    ) : selectedReport === REPORT_NAME_CATEGORIES ? (
      <CategoriesReport
        report={categoriesReport}
        selectedYear={selectedYear}
        displaySideBySide={true}
      />
    ) : (
      <DisplayCardWrapper>
        <DisplayCardBody>
          <DisplayCardRow>
            <CurrentBalancesReport report={currentBalancesReport} />
            <CashFlowsReport
              report={cashFlowsReport}
              selectedYear={selectedYear}
              showMore={true}
            />
            <CategoriesReport
              report={categoriesReport}
              selectedYear={selectedYear}
              displaySideBySide={false}
              showMore={true}
            />
          </DisplayCardRow>
        </DisplayCardBody>
      </DisplayCardWrapper>
    );

  return (
    <>
      {showBodyHeader()}
      {showYearSelectOptions()}
      {showSpecificReport()}
    </>
  );
};

export default Reports;
