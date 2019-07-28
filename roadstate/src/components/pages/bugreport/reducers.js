import {
  LOAD_BUG_REPORT_SUCCESS,
  LOAD_BUG_REPORT_REQUEST,
  LOAD_BUG_REPORT_FAILURE,
  RATE_BUG_REPORT_RECEIVE,
  RATE_BUG_REPORT_REQUEST,
  RATE_BUG_REPORT_FAILURE,
  LOAD_USER_NAME_REQUEST,
  LOAD_USER_NAME_SUCCESS,
  LOAD_USER_NAME_FAILURE,
  ADD_COMMENT_TO_BUG_REPORT_REQUEST,
  ADD_COMMENT_TO_BUG_REPORT_SUCCESS,
  ADD_COMMENT_TO_BUG_REPORT_FAILURE,
} from './actions';

const initialState = {
  loadingBugReport: false,
  loadingBugReportRating: false,
  currentBugReport: null,
  callbackError: false,
  isLoadingUserName: false,
  userName: null,
  processingComment: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BUG_REPORT_REQUEST:
      return { ...state, loadingBugReport: true };
    case LOAD_BUG_REPORT_SUCCESS:
      return { ...state, currentBugReport: action.bugReport, loadingBugReport: false };
    case LOAD_BUG_REPORT_FAILURE:
      return { ...state, loadingBugReport: false, callbackError: true };
    case RATE_BUG_REPORT_REQUEST:
      return { ...state, loadingBugReportRating: true };
    case RATE_BUG_REPORT_RECEIVE:
      return {
        ...state,
        currentBugReport: action.receivedBugReport,
        loadingBugReportRating: false,
      };
    case RATE_BUG_REPORT_FAILURE:
      return { ...state, loadingBugReportRating: false, callbackError: true };
    case LOAD_USER_NAME_REQUEST:
      return { ...state, isLoadingUserName: true };
    case LOAD_USER_NAME_SUCCESS:
      return { ...state, userName: action.userName };
    case LOAD_USER_NAME_FAILURE:
      return { ...state, isLoadingUserName: false, callbackError: true };
    case ADD_COMMENT_TO_BUG_REPORT_REQUEST:
      return { ...state, processingComment: true };
    case ADD_COMMENT_TO_BUG_REPORT_SUCCESS:
      return { ...state, currentBugReport: action.bugReport, processingComment: false };
    case ADD_COMMENT_TO_BUG_REPORT_FAILURE:
      return { ...state, processingComment: false, callbackError: true };
    default:
      return state;
  }
};
