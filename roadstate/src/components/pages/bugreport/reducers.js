import {
  LOAD_BUG_REPORT_SUCCESS,
  ADD_COMMENT_TO_BUG_REPORT,
  LOAD_BUG_REPORT_REQUEST,
  LOAD_BUG_REPORT_FAILURE,
  RATE_BUG_REPORT_RECEIVE,
  RATE_BUG_REPORT_REQUEST,
  RATE_BUG_REPORT_FAILURE,
} from './actions';

const initialState = {
  loadingBugReport: false,
  loadingBugReportRating: false,
  bugReport: null,
  callbackError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BUG_REPORT_REQUEST:
      return { ...state, loadingBugReport: true };
    case LOAD_BUG_REPORT_SUCCESS:
      return { ...state, bugReport: action.bugReport, loadingBugReport: false };
    case ADD_COMMENT_TO_BUG_REPORT:
      return {
        ...state,
        comments: action.comments,
        loadingBugReport: false,
      };
    case LOAD_BUG_REPORT_FAILURE:
      return { ...state, loadingBugReport: false, callbackError: true };
    case RATE_BUG_REPORT_REQUEST:
      return { ...state, loadingBugReportRating: true };
    case RATE_BUG_REPORT_RECEIVE:
      return { ...state, bugReport: action.receivedBugReport, loadingBugReportRating: false };
    case RATE_BUG_REPORT_FAILURE:
      return { ...state, loadingBugReportRating: false, callbackError: true };
    default:
      return state;
  }
};
