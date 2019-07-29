import * as api from '../../../api';

export const ADD_COMMENT_TO_BUG_REPORT_REQUEST = 'bugreports/ADD_COMMENT_TO_BUG_REPORT_REQUEST';
export const ADD_COMMENT_TO_BUG_REPORT_SUCCESS = 'bugreports/ADD_COMMENT_TO_BUG_REPORT_SUCCESS';
export const ADD_COMMENT_TO_BUG_REPORT_FAILURE = 'bugreports/ADD_COMMENT_TO_BUG_REPORT_FAILURE';

export const addCommentToBugReport = (bugReport, comment) => async (dispatch) => {
  dispatch({ type: ADD_COMMENT_TO_BUG_REPORT_REQUEST });
  const response = await api.addComment(bugReport.id, comment);
  if (response.status === 204) {
    const dispatchedBugReport = { ...bugReport, comments: [...bugReport.comments, comment] };
    dispatch({ type: ADD_COMMENT_TO_BUG_REPORT_SUCCESS, bugReport: dispatchedBugReport });
  } else {
    dispatch({ type: ADD_COMMENT_TO_BUG_REPORT_FAILURE });
  }
};

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

export const LOAD_USER_NAME_REQUEST = 'users/LOAD_USER_NAME_REQUEST';
export const LOAD_USER_NAME_SUCCESS = 'users/LOAD_USER_NAME_SUCCESS';
export const LOAD_USER_NAME_FAILURE = 'users/LOAD_USER_NAME_FAILURE';

export const loadUserName = id => async (dispatch) => {
  dispatch({ type: LOAD_USER_NAME_REQUEST });
  const response = await api.loadCurrentUser(id);
  if (response.status === 200) {
    dispatch({ type: LOAD_USER_NAME_SUCCESS, userName: response.data.userName });
  } else {
    dispatch({ type: LOAD_USER_NAME_FAILURE });
  }
};
