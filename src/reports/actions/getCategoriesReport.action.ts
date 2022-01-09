import { FetchOptions } from '../../common/utils/fetch';
import { prefetch } from '../../common/utils/prefetch';
import { getEndpoint } from '../../home/utils/endpoint';
import { DefaultReportsResponse, ReportsResponse } from '../types/reports.data.types';

export const getCategoriesReport = async (username: string, selectedyear: number): Promise<ReportsResponse> => {
  try {
    const urlPath = getEndpoint([process.env.BASE_URL as string, process.env.REPORT_CATEGORIES_ENDPOINT as string]);
    const options: Partial<FetchOptions> = {
      method: 'GET',
      pathParams: { username },
      queryParams: { selectedyear },
    };

    return (await prefetch(urlPath, options)) as ReportsResponse;
  } catch (error) {
    console.log('Get Categories Report Error: ', error);
    return getCategoriesReportError(DefaultReportsResponse);
  }
};

const getCategoriesReportError = (reportsResponse: ReportsResponse): ReportsResponse => {
  return {
    ...reportsResponse,
    status: {
      errMsg: 'Get Categories Report Error',
    },
  };
};
