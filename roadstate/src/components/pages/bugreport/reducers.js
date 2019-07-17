import { LOAD_BUG_REPORT_SUCCESS, ADD_COMMENT_TO_BUG_REPORT } from './actions';

const initialState = {
  loading: false,
  bugReport: null,
  comments: [],
};

const loadBugReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BUG_REPORT_SUCCESS:
      return { ...state, bugReport: action.bugReport, loading: false };
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
