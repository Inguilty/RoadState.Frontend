import {
  LOAD_BUG_REPORT_SUCCESS,
  LOAD_BUG_REPORT_REQUEST,
  LOAD_BUG_REPORT_FAILURE,
} from './actions';

const initialState = {
  loading: false,
  bugReport: null,
  callbackError: false,
};

const loadBugReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BUG_REPORT_REQUEST:
      return { ...state, loading: true };
    case LOAD_BUG_REPORT_SUCCESS:
      return { ...state, bugReport: action.bugReport, loading: false };
    case LOAD_BUG_REPORT_FAILURE:
      return { ...state, loading: false, callbackError: true };
    default:
      return state;
  }
};

export default loadBugReportReducer;
