import { LOAD_BUG_REPORT_SUCCESS } from "./actions";
import { SEND_MESSAGE } from "./actions";

const loadBugReportReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_BUG_REPORT_SUCCESS:
      return action.bugReport;
    default:
      return state;
  }
};

function sendReducer(state = [], action) {
  switch (action.type) {
    case SEND_MESSAGE:
      return [...state, { ...action.message }];
    default:
      return state;
  }
}
export default (loadBugReportReducer, sendReducer);
