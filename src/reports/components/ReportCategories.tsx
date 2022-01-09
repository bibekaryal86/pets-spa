import React from 'react';
import { useNavigate } from 'react-router-dom';
import { numberFormatter } from '../../accounts/utils/accounts.utils';
import { ReportCategoryTypes } from '../types/reports.data.types';
import { DisplayCardRow } from '../../styles/styled.card.style';
import Table from '../../common/forms/Table';
import { reportCategories } from '../utils/reports.utils';
import HrefLink from '../../common/forms/HrefLink';
import { REPORT_PATH_CATEGORIES, SESSION_TRANSACTION_FILTERS } from '../../common/utils/constants';
import styled from 'styled-components';
import { SessionStorage } from '../../common/utils/sessionStorageHelper';
import { DefaultTransactionFilters } from '../../transactions/types/transactions.data.types';

const ReportsSideBySide = styled.div.attrs({
  className: 'reports-side-by-side-wrapper',
})`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;

interface ReportCategoryTypesProps {
  report: ReportCategoryTypes[];
  selectedYear: number;
  displaySideBySide: boolean;
  showMore?: boolean;
}

export const CategoriesReport = (props: ReportCategoryTypesProps): React.ReactElement => {
  const navigate = useNavigate();
  const onClickToTransactions = (categoryTypeId: string, categoryId: string) => {
    SessionStorage.setItem(SESSION_TRANSACTION_FILTERS, {
      ...DefaultTransactionFilters,
      categoryTypeId,
      categoryId,
    });
    navigate('/transactions');
  };

  const categoriesTotal = (reportCategoryType: ReportCategoryTypes) => {
    return (
      <>
        {reportCategoryType.reportCategories.map((x) => (
          <div key={x.refCategory.id}>
            <HrefLink
              id={`cat-report-both-cat-${x.refCategory.id}`}
              linkTo="#"
              title={x.refCategory.description}
              onClick={() => onClickToTransactions('', x.refCategory.id)}
            />
            : {numberFormatter(+x.totalRefCategory)}
          </div>
        ))}
      </>
    );
  };

  const combinedReport = (): React.ReactElement => {
    const bothReportHeaders = ['Category Types', 'Total', 'Categories'];
    const bothReportData = Array.from(props.report, (x) => {
      return {
        catType: (
          <HrefLink
            id={`cat-report-both-cat-type-${x.refCategoryType.id}`}
            linkTo="#"
            title={x.refCategoryType.description}
            onClick={() => onClickToTransactions(x.refCategoryType.id, '')}
          />
        ),
        totalCatType: numberFormatter(+x.totalRefCategoryType),
        categoriesTotal: categoriesTotal(x),
      };
    });

    return (
      <>
        {props.showMore && (
          <DisplayCardRow>
            Click here to see reports for previous years:
            <HrefLink id="report-categories-show-more" linkTo={REPORT_PATH_CATEGORIES} title="Categories Report" />
          </DisplayCardRow>
        )}

        <Table
          title={`Combined Category Report for year ${props.selectedYear}`}
          headers={bothReportHeaders}
          data={bothReportData}
        />
      </>
    );
  };

  const categoryTypesReport = (): React.ReactElement => {
    const catTypeTableHeaders = ['Category Types', 'Total'];
    const catTypeTableData = Array.from(props.report, (x) => {
      return {
        catType: (
          <HrefLink
            id={`cat-report-type-cat-type-${x.refCategoryType.id}`}
            linkTo="#"
            title={x.refCategoryType.description}
            onClick={() => onClickToTransactions(x.refCategoryType.id, '')}
          />
        ),
        totalCatType: numberFormatter(+x.totalRefCategoryType),
      };
    });

    return (
      <Table
        title={`Category Types Report for year ${props.selectedYear}`}
        headers={catTypeTableHeaders}
        data={catTypeTableData}
        isExportToCsv={!props.showMore}
        exportToCsvFileName={`Report_Category_Types_${props.selectedYear}.csv`}
        isSortAllowed
      />
    );
  };

  const categoriesReport = (): React.ReactElement => {
    const catTableHeaders = ['Category', 'Total'];
    const categories = reportCategories(props.report);
    const catTableData = Array.from(categories, (x) => {
      return {
        category: (
          <HrefLink
            id={`cat-report-cat-${x.refCategory.id}`}
            linkTo="#"
            title={x.refCategory.description}
            onClick={() => onClickToTransactions('', x.refCategory.id)}
          />
        ),
        totalCategory: numberFormatter(+x.totalRefCategory),
      };
    });

    return (
      <Table
        title={`Categories Report for year ${props.selectedYear}`}
        headers={catTableHeaders}
        data={catTableData}
        isExportToCsv={!props.showMore}
        exportToCsvFileName={`Report_Categories_${props.selectedYear}.csv`}
        isSortAllowed
      />
    );
  };

  return (
    <>
      {combinedReport()}
      {props.displaySideBySide && (
        <ReportsSideBySide>
          {categoryTypesReport()}
          {categoriesReport()}
        </ReportsSideBySide>
      )}
    </>
  );
};
