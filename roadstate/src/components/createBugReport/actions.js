import * as api from '../../__mock__/api';

export const CREATE_BUG_REPORT_REQUEST = 'create-bug-report/CREATE_BUG_REPORT_REQUEST';
export const CREATE_BUG_REPORT_SUCCESS = 'create-bug-report/CREATE_BUG_REPORT_SUCCESS';
export const CREATE_BUG_REPORT_FAILURE = 'create-bug-report/CREATE_BUG_REPORT_FAILURE';

export const createBugReport = createBR => async (dispatch) => {
  dispatch({ type: CREATE_BUG_REPORT_REQUEST });
  // call API
  const bugReportResult = await api.createBugReport(createBR);
  if (bugReportResult.status === 200) {
    dispatch({
      type: CREATE_BUG_REPORT_SUCCESS,
    });
  } else {
    dispatch({
      type: CREATE_BUG_REPORT_FAILURE,
    });
  }
  // return bugReportResult;
};
