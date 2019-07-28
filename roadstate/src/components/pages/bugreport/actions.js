import * as api from '../../../api';

export const ADD_COMMENT_TO_BUG_REPORT = 'bugreports/ADD_COMMENT_TO_BUG_REPORT';
export const addCommentToBugReport = bugReport => ({
  type: ADD_COMMENT_TO_BUG_REPORT,
  bugReport,
});

export const RATE_BUG_REPORT_REQUEST = 'bugreports/RATE_BUG_REPORT_REQUEST';
export const RATE_BUG_REPORT_RECEIVE = 'bugreports/RATE_BUG_REPORT_RECEIVE';
export const RATE_BUG_REPORT_FAILURE = 'bugreports/RATE_BUG_REPORT_FAILURE';

export const rateBugReport = (bugReport, rate, token) => async (dispatch) => {
  dispatch({ type: RATE_BUG_REPORT_REQUEST });
  const rateBugReportResponse = await api.rateBugReport(bugReport.id, rate, token);
  if (rateBugReportResponse.status === 200) {
    const receivedBugReport = { ...bugReport, userRate: rate };
    dispatch({
      type: RATE_BUG_REPORT_RECEIVE,
      receivedBugReport,
    });
  } else {
    dispatch({
      type: RATE_BUG_REPORT_FAILURE,
    });
  }
};

export const LOAD_BUG_REPORT_REQUEST = 'bugreports/LOAD_BUG_REPORT_REQUEST';
export const LOAD_BUG_REPORT_SUCCESS = 'bugreports/LOAD_BUG_REPORT_SUCCESS';
export const LOAD_BUG_REPORT_FAILURE = 'bugreports/LOAD_BUG_REPORT_FAILURE';

export const loadBugReport = (id, userId) => async (dispatch) => {
  dispatch({ type: LOAD_BUG_REPORT_REQUEST });

  const bugReport = await api.loadBugReport(id, userId);

  if (bugReport.status === 200) {
    dispatch({
      type: LOAD_BUG_REPORT_SUCCESS,
      bugReport: bugReport.data,
    });
  } else {
    dispatch({
      type: LOAD_BUG_REPORT_FAILURE,
    });
  }
};
