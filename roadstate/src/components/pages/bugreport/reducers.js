import { LOAD_BUG_REPORT_SUCCESS, ADD_COMMENT_TO_BUG_REPORT } from './actions';

const loadBugReportReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_BUG_REPORT_SUCCESS:
      return action.bugReport;
    case ADD_COMMENT_TO_BUG_REPORT:
      return action.bugReport.comments;
    default:
      return state;
  }
};

export default loadBugReportReducer;
