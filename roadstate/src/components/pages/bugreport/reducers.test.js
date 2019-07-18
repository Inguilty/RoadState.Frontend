import loadBugReportReducer from './reducers';
import {
  LOAD_BUG_REPORT_REQUEST,
  LOAD_BUG_REPORT_SUCCESS,
  LOAD_BUG_REPORT_FAILURE,
} from './actions';
import * as api from '../../../api';

describe('bugReportReducer', () => {
  const initialState = {
    loading: false,
    bugReport: null,
    callbackError: false,
  };
  describe('LOAD_BUG_REPORT_REQUEST', () => {
    it('should change the loading status', () => {
      const expectedState = { ...initialState, loading: true };
      const action = { type: LOAD_BUG_REPORT_REQUEST };

      const currentState = loadBugReportReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });

  describe('LOAD_BUG_REPORT_SUCCESS', () => {
    it('should return bugReport object inside the state', async () => {
      const id = 1;
      const bugReport = (await api.loadBugReport(id)).response;
      const action = { type: LOAD_BUG_REPORT_SUCCESS, bugReport };
      const expectedState = { ...initialState, loading: false, bugReport };

      const currentState = loadBugReportReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });

  describe('LOAD_BUG_REPORT_FAILURE', () => {
    it('should change the callbackError status', () => {
      const action = { type: LOAD_BUG_REPORT_FAILURE };
      const expectedState = { ...initialState, callbackError: true, loading: false };

      const currentState = loadBugReportReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });
});
