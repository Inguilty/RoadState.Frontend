import { LOAD_BUG_REPORT_SUCCESS } from './actions';

const loadBugReportReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_BUG_REPORT_SUCCESS:
      return action.bugReport;
    default:
      return state;
  }
};

export default loadBugReportReducer;
