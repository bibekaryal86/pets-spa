import { FetchOptions } from '../../common/utils/fetch';
import { prefetch } from '../../common/utils/prefetch';
import { getEndpoint } from '../../home/utils/endpoint';
import {
  DefaultReportsResponse,
  ReportsResponse,
} from '../types/reports.data.types';

export const getCashFlowsReport = async (
  username: string,
  selectedyear: number,
): Promise<ReportsResponse> => {
  try {
    const urlPath = getEndpoint([
      process.env.BASE_URL as string,
      process.env.REPORT_CASH_FLOWS_ENDPOINT as string,
    ]);
    const options: Partial<FetchOptions> = {
      method: 'GET',
      pathParams: { username },
      queryParams: { selectedyear },
    };

    return (await prefetch(urlPath, options)) as ReportsResponse;
  } catch (error) {
    console.log('Get Cash Flows Report Error: ', error);
    return getCashFlowsReportError(DefaultReportsResponse);
  }
};

const getCashFlowsReportError = (
  reportsResponse: ReportsResponse,
): ReportsResponse => {
  return {
    ...reportsResponse,
    status: {
      errMsg: 'Get Cash Flows Report Error',
    },
  };
};
