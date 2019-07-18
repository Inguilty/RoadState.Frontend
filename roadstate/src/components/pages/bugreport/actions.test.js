import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as bugReportActions from './actions';
import { getBugReport } from '../../../__mock__/api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('bugReportActions', () => {
  it('should load a bug report', async () => {
    // Arrange
    const id = 1;
    const expectedBugReport = await getBugReport(id);
    const expectedActions = [
      { type: bugReportActions.LOAD_BUG_REPORT_REQUEST },
      { type: bugReportActions.LOAD_BUG_REPORT_SUCCESS, bugReport: expectedBugReport },
    ];

    // Act
    const store = mockStore({ bugReport: null });

    // Assert
    return store.dispatch(bugReportActions.loadBugReportAsync(id)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
