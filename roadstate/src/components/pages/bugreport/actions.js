import { getBugReport } from '../../../__mock__/api';

export const ADD_COMMENT_TO_BUG_REPORT = 'bugreports/ADD_COMMENT_TO_BUG_REPORT';
export const addCommentToBugReport = bugReport => ({
  type: ADD_COMMENT_TO_BUG_REPORT,
  bugReport,
});

export const LOAD_BUG_REPORT_RESPONSE = 'bugreports/LOAD_BUG_REPORT_RESPONSE';
export const LOAD_BUG_REPORT_SUCCESS = 'bugreports/LOAD_BUG_REPORT_SUCCESS';
export const loadBugReportAsync = id => async (dispatch) => {
  try {
    dispatch({ type: LOAD_BUG_REPORT_RESPONSE });
    const bugReport = await getBugReport(id);
    dispatch({
      type: LOAD_BUG_REPORT_SUCCESS,
      bugReport,
    });
  } catch (error) {
    console.log(error);
  }
};
