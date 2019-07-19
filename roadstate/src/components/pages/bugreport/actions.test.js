import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as bugReportActions from './actions';
import * as api from '../../../api/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('bugReportActions', () => {
  it('should load a bug report', async () => {
    // Arrange
    const id = 1;
    const errorOccured = false;
    const expectedBugReport = (await api.loadBugReport(id)).response;
    const expectedActions = [
      { type: bugReportActions.LOAD_BUG_REPORT_REQUEST },
      { type: bugReportActions.LOAD_BUG_REPORT_SUCCESS, bugReport: expectedBugReport },
    ];

    // Act
    const store = mockStore({ bugReport: null });

    // Assert
    return store.dispatch(bugReportActions.loadBugReport(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(errorOccured).toBeFalsy();
    });
  });
});
