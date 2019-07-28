import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as rectangleBRactions from './actions';
import * as api from '../../api';
import * as apiMock from '../../__mock__/api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('rectangleBRactions', () => {
  it('should send a coordinates of rectangle', async () => {
    // Arrange
    const longitudemin = 0;
    const longitudemax = 0;
    const latitudemin = 0;
    const latitudemax = 0;
    const bugReports = [{}, {}];
    const expectedActions = [
      { type: rectangleBRactions.BUG_REPORT_RECTANGLE_REQUEST },
      { type: rectangleBRactions.BUG_REPORT_RECTANGLE_SUCCESS, bugReports },
    ];
    let apiCalled = false;
    api.getBugReportRectangle = apiMock.callApiMock({ data: bugReports, status: 200 }, () => {
      apiCalled = true;
    });

    // Act
    const store = mockStore({ bugReports: null });

    // Assert
    return store
      .dispatch(
        rectangleBRactions.getBugReportRectangle(
          longitudemin,
          longitudemax,
          latitudemin,
          latitudemax,
        ),
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(apiCalled).toBeTruthy();
      });
  });
});
