import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as bugReportActions from './actions';
import * as api from '../../../api';
import * as apiMock from '../../../__mock__/api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('bugReportActions', () => {
  it('should load a bug report', async () => {
    // Arrange
    const id = 1;
    const errorOccured = false;
    const bugReport = { id: 1 };
    let apiCalled = false;
    const expectedActions = [
      { type: bugReportActions.LOAD_BUG_REPORT_REQUEST },
      { type: bugReportActions.LOAD_BUG_REPORT_SUCCESS, bugReport },
    ];
    api.loadBugReport = apiMock.loadBugReport({ data: bugReport, status: 200 },
      () => { apiCalled = true; });

    // Act
    const store = mockStore({ bugReport: null });

    // Assert
    return store.dispatch(bugReportActions.loadBugReport(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(errorOccured).toBeFalsy();
      expect(apiCalled).toBeTruthy();
    });
  });

  it('should rate bug report', async () => {
    // Arrange
    const unratedBugReport = {};
    const errorOccured = false;
    const expectedBugReport = { userRate: 'agree' };
    let apiCalled = false;
    const expectedActions = [
      { type: bugReportActions.RATE_BUG_REPORT_REQUEST },
      { type: bugReportActions.RATE_BUG_REPORT_RECEIVE, receivedBugReport: expectedBugReport },
    ];
    api.rateBugReport = apiMock.rateBugReport({ data: null, status: 200 },
      () => { apiCalled = true; });

    // Act
    const store = mockStore({ unratedBugReport });

    // Assert
    return store.dispatch(bugReportActions.rateBugReport(unratedBugReport, 'agree')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(errorOccured).toBeFalsy();
      expect(apiCalled).toBeTruthy();
    });
  });
});
