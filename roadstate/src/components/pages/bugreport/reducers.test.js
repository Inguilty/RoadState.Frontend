import loadBugReportReducer from './reducers';
import { LOAD_BUG_REPORT_REQUEST, LOAD_BUG_REPORT_SUCCESS } from './actions';
import { getBugReport } from '../../../__mock__/api';

describe('bugReportReducer', () => {
  const expectedInitialState = {
    loading: false,
    bugReport: null,
    comments: [],
  };
  it('should return an initial state', () => {
    expect(loadBugReportReducer(undefined, {})).toEqual(expectedInitialState);
  });

  it('should change load status', () => {
    expect(loadBugReportReducer(undefined, { type: LOAD_BUG_REPORT_REQUEST })).toEqual({
      ...expectedInitialState,
      loading: true,
    });
  });
  it('should return bug report', async () => {
    const bugReport = await getBugReport(1);
    expect(loadBugReportReducer(undefined, { type: LOAD_BUG_REPORT_SUCCESS, bugReport })).toEqual({
      ...expectedInitialState,
      bugReport,
    });
  });
});
