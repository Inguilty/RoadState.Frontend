import {
  BUG_REPORT_RECTANGLE_REQUEST,
  BUG_REPORT_RECTANGLE_SUCCESS,
  BUG_REPORT_RECTANGLE_FAILURE,
} from './actions';

const initialState = {
  isLoading: false,
  bugReports: [],
};

const loadBugReportRectangle = (state = initialState, action) => {
  switch (action.type) {
    case BUG_REPORT_RECTANGLE_REQUEST:
      return { ...state, isLoading: true };
    case BUG_REPORT_RECTANGLE_SUCCESS:
      return { ...state, bugReports: action.bugReports, isLoading: false };
    case BUG_REPORT_RECTANGLE_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default loadBugReportRectangle;
