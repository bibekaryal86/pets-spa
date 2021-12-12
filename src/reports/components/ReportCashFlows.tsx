import {useHistory} from 'react-router-dom';
import {numberFormatter} from '../../accounts/utils/accounts.utils';
import {ReportCashFlows} from '../types/reports.data.types';
import {DisplayCardRow} from '../../styles/styled.card.style';
import Table from '../../common/forms/Table';
import HrefLink from '../../common/forms/HrefLink';
import {REPORT_PATH_CASH_FLOWS, SESSION_TRANSACTION_FILTERS,} from '../../common/utils/constants';
import {SessionStorage} from '../../common/utils/sessionStorageHelper';
import {DefaultTransactionFilters} from '../../transactions/types/transactions.data.types';

interface ReportCashFlowsProps {
    report: ReportCashFlows[];
    selectedYear: number;
    showMore?: boolean;
}

export const CashFlowsReport = (
    props: ReportCashFlowsProps,
): React.ReactElement | null => {
    const history = useHistory();
    const onClickToTransactions = (txnDateFrom: string, txnDateTo: string) => {
        SessionStorage.setItem(SESSION_TRANSACTION_FILTERS, {
            ...DefaultTransactionFilters,
            txnDateFrom,
            txnDateFromOnBlur: true,
            txnDateTo,
            txnDateToOnBlur: true,
        });
        history.push('/transactions');
    };

    const tableHeaders = ['Month', 'Incomes', 'Expenses', 'Gain/Loss'];

    const tableData = Array.from(props.report, (x) => {
        return {
            month: (
                <HrefLink
                    id={`report-cash-flows-${x.month}`}
                    linkTo="#"
                    title={x.month}
                    onClick={() =>
                        onClickToTransactions(x.monthBeginDate, x.monthEndDate)
                    }
                />
            ),
            incomes: numberFormatter(+x.totalIncomes),
            expenses: numberFormatter(+x.totalExpenses),
            gainLoss: numberFormatter(+x.netSavings),
        };
    });

    return (
        <>
            <Table
                title={`Cash Flows for year ${props.selectedYear}`}
                headers={tableHeaders}
                data={tableData}
                isExportToCsv={!props.showMore}
                exportToCsvFileName={`Report_Cash_Flows_${props.selectedYear}.csv`}
                isSortAllowed
            />
            {props.showMore && (
                <DisplayCardRow>
                    Click here to see reports for previous years:
                    <HrefLink
                        id="report-cash-flows-show-more"
                        linkTo={REPORT_PATH_CASH_FLOWS}
                        title="Cash Flows Report"
                    />
                </DisplayCardRow>
            )}
        </>
    );
};
