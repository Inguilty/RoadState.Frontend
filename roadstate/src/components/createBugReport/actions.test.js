import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as createBugReportActions from './actions';
import * as api from '../../api';
import * as apiMock from '../../__mock__/api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('createBugReportActions', () => {
  it('should send a bug report', async () => {
    // Arrange
    const bugReport = {};
    const expectedActions = [
      { type: createBugReportActions.CREATE_BUG_REPORT_REQUEST },
      { type: createBugReportActions.CREATE_BUG_REPORT_SUCCESS },
    ];
    let apiCalled = false;
    api.createBugReport = apiMock.callApiMock({ data: bugReport, status: 200 },
      () => { apiCalled = true; });
    // Act
    const store = mockStore({ createBugReport: null });

    // Assert
    return store.dispatch(createBugReportActions.createBugReport(bugReport)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(apiCalled).toBeTruthy();
    });
  });
});
