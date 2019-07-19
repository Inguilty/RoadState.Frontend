import {
  CREATE_BUG_REPORT_SUCCESS,
  CREATE_BUG_REPORT_REQUEST,
  CREATE_BUG_REPORT_FAILURE,
} from './actions';

const initialState = {
  loading: false,
  createBugReport: null,
};
const createBugReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BUG_REPORT_REQUEST:
      return { ...state, loading: true };
    case CREATE_BUG_REPORT_SUCCESS:
      return { ...state, bugReport: action.createBugReport, loading: false };
    case CREATE_BUG_REPORT_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default createBugReportReducer;
