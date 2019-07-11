import { getBugReport } from '../../../__mock__/api';

export const LOAD_BUG_REPORT_SUCCESS = 'bugreports/LOAD_BUG_REPORT_SUCCESS';

export const loadBugReport = bugReport => ({
  type: LOAD_BUG_REPORT_SUCCESS,
  bugReport
});

export const loadBugReportAsync = id => async dispatch => {
  try {
    const bugReport = await getBugReport(id);
    dispatch(loadBugReport(bugReport));
  } catch (error) {
    console.log(error);
  }
};