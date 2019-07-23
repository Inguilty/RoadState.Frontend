import * as api from '../../../api';

export const LOAD_BUG_REPORT_REQUEST = 'bugreports/LOAD_BUG_REPORT_RESPONSE';
export const LOAD_BUG_REPORT_SUCCESS = 'bugreports/LOAD_BUG_REPORT_SUCCESS';
export const LOAD_BUG_REPORT_FAILURE = 'bugreports/LOAD_BUG_REPORT_FAILURE';
export const loadBugReport = id => async (dispatch) => {
  dispatch({ type: LOAD_BUG_REPORT_REQUEST });
  const bugReport = await api.loadBugReport(id);
  if (bugReport.status === 200) {
    dispatch({
      type: LOAD_BUG_REPORT_SUCCESS,
      bugReport: bugReport.response,
    });
  } else {
    dispatch({
      type: LOAD_BUG_REPORT_FAILURE,
    });
  }
};
