import * as api from '../../api';

export const BUG_REPORT_RECTANGLE_REQUEST = 'bugreports/BUG_REPORT_RECTANGLE_REQUEST';
export const BUG_REPORT_RECTANGLE_SUCCESS = 'bugreports/BUG_REPORT_RECTANGLE_SUCCESS';
export const BUG_REPORT_RECTANGLE_FAILURE = 'bugreports/BUG_REPORT_RECTANGLE_FAILURE';

export const getBugReportRectangle = (
  longitudemin,
  longitudemax,
  latitudemin,
  latitudemax,
) => async (dispatch) => {
  dispatch({ type: BUG_REPORT_RECTANGLE_REQUEST });
  const getBugReports = await api.getBugReportRectangle(
    longitudemin,
    longitudemax,
    latitudemin,
    latitudemax,
  );
  if (getBugReports.status === 200) {
    dispatch({
      type: BUG_REPORT_RECTANGLE_SUCCESS,
      bugReports: getBugReports.data,
    });
  } else {
    dispatch({
      type: BUG_REPORT_RECTANGLE_FAILURE,
    });
  }
};

export const LOAD_ROAD_NAME_REQUEST = 'map/LOAD_ROAD_NAME_REQUEST';
export const LOAD_ROAD_NAME_PROGRESS = 'map/LOAD_ROAD_NAME_PROGRESS';
export const LOAD_ROAD_NAME_RECEIVED = 'map/LOAD_ROAD_NAME_RECEIVED';

export const loadRoadName = bugReports => async (dispatch) => {
  dispatch({ type: LOAD_ROAD_NAME_REQUEST });
  for (const bugReport of bugReports) {
    const { latitude, longitude } = bugReport.location;
    const response = await api.loadCurrentRoad(latitude, longitude);
    let address;
    if (response.status === 200) {
      address = response.data.results.find(x => x.geometry.location_type === 'GEOMETRIC_CENTER')
        .formatted_address;
    } else {
      address = 'Unknown location';
    }
    dispatch({ type: LOAD_ROAD_NAME_PROGRESS, roadName: { id: bugReport.id, address } });
  }
  dispatch({ type: LOAD_ROAD_NAME_RECEIVED });
};
