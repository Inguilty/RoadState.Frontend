import {
  BUG_REPORT_RECTANGLE_REQUEST,
  BUG_REPORT_RECTANGLE_SUCCESS,
  BUG_REPORT_RECTANGLE_FAILURE,
} from './actions';

const initialState = {
  isLoading: false,
  rectangleBugReports: [],
};

const loadBugReportRectangle = (state = initialState, action) => {
  switch (action.type) {
    case BUG_REPORT_RECTANGLE_REQUEST:
      return { ...state, isLoading: true };
    case BUG_REPORT_RECTANGLE_SUCCESS:
      return { ...state, rectangleBugReports: action.rectangleBugReports, isLoading: false };
    case BUG_REPORT_RECTANGLE_FAILURE:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default loadBugReportRectangle;
