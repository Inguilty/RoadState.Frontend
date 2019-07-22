import bugReportReducer from './reducers';
import {
  LOAD_BUG_REPORT_REQUEST,
  LOAD_BUG_REPORT_SUCCESS,
  LOAD_BUG_REPORT_FAILURE,
  RATE_BUG_REPORT_REQUEST,
  RATE_BUG_REPORT_RECEIVE,
  RATE_BUG_REPORT_FAILURE,
} from './actions';
import * as api from '../../../api';

describe('bugReportReducer', () => {
  const initialState = {
    loadingBugReport: false,
    loadingBugReportRating: false,
    bugReport: null,
    callbackError: false,
  };
  describe('LOAD_BUG_REPORT_REQUEST', () => {
    it('should change the loading status', () => {
      const expectedState = { ...initialState, loadingBugReport: true };
      const action = { type: LOAD_BUG_REPORT_REQUEST };

      const currentState = bugReportReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });

  describe('LOAD_BUG_REPORT_SUCCESS', () => {
    it('should return bugReport object inside the state', async () => {
      const id = 1;
      const bugReport = (await api.loadBugReport(id)).data;
      const action = { type: LOAD_BUG_REPORT_SUCCESS, bugReport };
      const expectedState = { ...initialState, loadingBugReport: false, bugReport };

      const currentState = bugReportReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });

  describe('LOAD_BUG_REPORT_FAILURE', () => {
    it('should change the callbackError status', () => {
      const action = { type: LOAD_BUG_REPORT_FAILURE };
      const expectedState = { ...initialState, callbackError: true, loadingBugReport: false };

      const currentState = bugReportReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });

  describe('RATE_BUG_REPORT_REQUEST', () => {
    it('should change the loading status', () => {
      const expectedState = { ...initialState, loadingBugReportRating: true };
      const action = { type: RATE_BUG_REPORT_REQUEST };

      const currentState = bugReportReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });

  describe('RATE_BUG_REPORT_RECEIVE', () => {
    it('should return rated bugReport object inside the state', async () => {
      const receivedBugReport = { userRate: 'agree' };
      const action = { type: RATE_BUG_REPORT_RECEIVE, receivedBugReport };
      const expectedState = {
        ...initialState,
        loadingBugReportRating: false,
        bugReport: receivedBugReport,
      };

      const currentState = bugReportReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });

  describe('RATE_BUG_REPORT_FAILURE', () => {
    it('should change the callbackError status', () => {
      const action = { type: RATE_BUG_REPORT_FAILURE };
      const expectedState = { ...initialState, callbackError: true, loadingBugReportRating: false };

      const currentState = bugReportReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });
});
