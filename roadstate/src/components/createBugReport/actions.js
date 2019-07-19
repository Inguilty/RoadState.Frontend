import axios from 'axios';

export const CREATE_BUG_REPORT_REQUEST = 'create-bug-report/CREATE_BUG_REPORT_REQUEST';
export const CREATE_BUG_REPORT_SUCCESS = 'create-bug-report/CREATE_BUG_REPORT_SUCCESS';
export const CREATE_BUG_REPORT_FAILURE = 'create-bug-report/CREATE_BUG_REPORT_FAILURE';

export const createBugReport = bugreport => async (dispatch) => {
  dispatch({ type: CREATE_BUG_REPORT_REQUEST });

  // call API
  axios.post(`${axios.defaults.baseURL}/bugreport`, { bugreport }).then((res) => { console.log(res); });

  dispatch({ type: CREATE_BUG_REPORT_SUCCESS });
};
