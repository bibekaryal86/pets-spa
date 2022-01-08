import { SelectOptionProps } from '../../common/forms/Select';
import { YEAR_ZERO } from '../../common/utils/constants';
import { ReportCategories, ReportCategoryTypes } from '../types/reports.data.types';

export const yearsDropdownForReports = (): SelectOptionProps[] => {
  const years = [] as SelectOptionProps[];
  let startYear = YEAR_ZERO;
  const currentYear = new Date().getFullYear();

  while (startYear <= currentYear) {
    years.push({ value: startYear.toString(), text: startYear.toString() });
    startYear++;
  }

  return years;
};

export const reportCategories = (report: ReportCategoryTypes[]): ReportCategories[] => {
  const reportCategories = report.flatMap((x) => x.reportCategories);
  reportCategories.sort((a, b) => (a.refCategory?.description > b.refCategory?.description ? 1 : -1));
  return reportCategories;
};
