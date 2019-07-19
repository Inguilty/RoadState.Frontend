import { getBugReport } from '../../../__mock__/api';

export const ADD_COMMENT_TO_BUG_REPORT = 'bugreports/ADD_COMMENT_TO_BUG_REPORT';
export const addCommentToBugReport = bugReport => ({
  type: ADD_COMMENT_TO_BUG_REPORT,
  bugReport,
});

export const RATE_BUG_REPORT_REQUEST = 'bugreports/RATE_BUG_REPORT_REQUEST';
export const RATE_BUG_REPORT_RECEIVE = 'bugreports/RATE_BUG_REPORT_RECEIVE';
export const rateBugReport = (bugReport, rate) => async (dispatch) => {
  try {
    dispatch({ type: RATE_BUG_REPORT_REQUEST });
    // api call to change bug report rating
    const receivedBugReport = { ...bugReport, userRate: rate };
    dispatch({
      type: RATE_BUG_REPORT_RECEIVE,
      receivedBugReport,
    });
  } catch (error) {
    console.log(error);
  }
};

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
