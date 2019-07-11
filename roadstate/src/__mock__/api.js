import { bugReports } from './mockData';

export const getBugReport = async id => bugReports.find(x => x.id === id);
