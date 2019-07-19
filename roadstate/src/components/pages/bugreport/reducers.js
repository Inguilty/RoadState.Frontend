import {
  LOAD_BUG_REPORT_SUCCESS,
  ADD_COMMENT_TO_BUG_REPORT,
  RATE_BUG_REPORT_RECEIVE,
  RATE_BUG_REPORT_REQUEST,
} from './actions';

const initialState = {
  loading: false,
  bugReport: null,
  comments: [],
};

const loadBugReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BUG_REPORT_SUCCESS:
      return { ...state, bugReport: action.bugReport, loading: false };
    case RATE_BUG_REPORT_REQUEST:
      return { ...state, loading: true };
    case RATE_BUG_REPORT_RECEIVE:
      return { ...state, bugReport: action.receivedBugReport, loading: false };
    case ADD_COMMENT_TO_BUG_REPORT:
      return {
        ...state,
        comments: action.comments,
        loading: false,
      };
    default:
      return state;
  }
};

export default loadBugReportReducer;
