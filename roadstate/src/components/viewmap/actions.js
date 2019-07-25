import * as api from '../../api';

export const BUG_REPORT_RECTANGLE_REQUEST = 'bugreports/BUG_REPORT_RECTANGLE_REQUEST';
export const BUG_REPORT_RECTANGLE_SUCCESS = 'bugreports/BUG_REPORT_RECTANGLE_SUCCESS';
export const BUG_REPORT_RECTANGLE_FAILURE = 'bugreports/BUG_REPORT_RECTANGLE_FAILURE';

export const bugReportRectangle = (longitudemin, longitudemax, latitudemin, latitudemax) => async (dispatch) => {
    dispatch({ type: BUG_REPORT_RECTANGLE_REQUEST });
    const getBugReports = await api.bugReportRectangle(longitudemin, longitudemax, latitudemin, latitudemax);
    if (getBugReports.status === 200) {
        dispatch({
            type: BUG_REPORT_RECTANGLE_SUCCESS,
            rectangleBugReports: getBugReports.data,
        });
    } else {
        dispatch({
            type: BUG_REPORT_RECTANGLE_FAILURE,
        });
    }
};