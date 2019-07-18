import { LOAD_BUG_REPORT_SUCCESS, LOAD_BUG_REPORT_REQUEST } from './actions';

const initialState = {
  loading: false,
  bugReport: null,
};

const loadBugReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BUG_REPORT_REQUEST:
      return { ...state, loading: true };
    case LOAD_BUG_REPORT_SUCCESS:
      return { ...state, bugReport: action.bugReport, loading: false };
    default:
      return state;
  }
};

export default loadBugReportReducer;
