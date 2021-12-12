import {FetchOptions} from '../../common/utils/fetch';
import {prefetch} from '../../common/utils/prefetch';
import {getEndpoint} from '../../home/utils/endpoint';
import {DefaultReportsResponse, ReportsResponse,} from '../types/reports.data.types';

export const getCurrentBalancesReport = async (
    username: string,
): Promise<ReportsResponse> => {
    try {
        const urlPath = getEndpoint([
            process.env.BASE_URL as string,
            process.env.REPORT_CURRENT_BALANCES_ENDPOINT as string,
        ]);
        const options: Partial<FetchOptions> = {
            method: 'GET',
            pathParams: {username},
        };

        return (await prefetch(urlPath, options)) as ReportsResponse;
    } catch (error) {
        console.log('Get Current Balances Report Error: ', error);
        return getCurrentBalancesReportError(DefaultReportsResponse);
    }
};

const getCurrentBalancesReportError = (
    reportsResponse: ReportsResponse,
): ReportsResponse => {
    return {
        ...reportsResponse,
        status: {
            errMsg: 'Get Current Balances Report Error',
        },
    };
};
