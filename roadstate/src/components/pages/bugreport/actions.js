import { getBugReport } from '../../../__mock__/api';

export const LOAD_BUG_REPORT_REQUEST = 'bugreports/LOAD_BUG_REPORT_RESPONSE';
export const LOAD_BUG_REPORT_SUCCESS = 'bugreports/LOAD_BUG_REPORT_SUCCESS';
export const loadBugReportAsync = id => async (dispatch) => {
  try {
    dispatch({ type: LOAD_BUG_REPORT_REQUEST });
    const bugReport = await getBugReport(id);
    dispatch({
      type: LOAD_BUG_REPORT_SUCCESS,
      bugReport,
    });
  } catch (error) {
    console.log(error);
  }
};
