import {
  BUG_REPORT_RECTANGLE_REQUEST,
  BUG_REPORT_RECTANGLE_SUCCESS,
  BUG_REPORT_RECTANGLE_FAILURE,
  LOAD_ROAD_NAME_REQUEST,
  LOAD_ROAD_NAME_PROGRESS,
  LOAD_ROAD_NAME_RECEIVED,
} from './actions';

const initialState = {
  isLoading: false,
  bugReports: [],
  loadingRoadName: false,
  bugReportsRoadNames: [],
};

const loadBugReportRectangle = (state = initialState, action) => {
  switch (action.type) {
    case BUG_REPORT_RECTANGLE_REQUEST:
      return { ...state, isLoading: true };
    case BUG_REPORT_RECTANGLE_SUCCESS:
      return { ...state, bugReports: action.bugReports, isLoading: false };
    case BUG_REPORT_RECTANGLE_FAILURE:
      return { ...state, isLoading: false };
    case LOAD_ROAD_NAME_REQUEST:
      return { ...state, loadingRoadName: true };
    case LOAD_ROAD_NAME_PROGRESS:
      return { ...state, bugReportsRoadNames: [...state.bugReportsRoadNames, action.roadName] };
    case LOAD_ROAD_NAME_RECEIVED:
      return { ...state, loadingRoadName: false };
    default:
      return state;
  }
};

export default loadBugReportRectangle;
