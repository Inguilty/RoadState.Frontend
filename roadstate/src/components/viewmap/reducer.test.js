import loadBugReportRectangle from './reducer';
import {
  BUG_REPORT_RECTANGLE_REQUEST,
  BUG_REPORT_RECTANGLE_SUCCESS,
  BUG_REPORT_RECTANGLE_FAILURE,
} from './actions';

describe('loadBugReportRectangle', () => {
  const initialState = {
    isLoading: false,
    bugReports: [],
  };

  describe('BUG_REPORT_RECTANGLE_REQUEST', () => {
    it('should send a coordinates of rectangle', () => {
      const expectedState = { ...initialState, isLoading: true };
      const action = { type: BUG_REPORT_RECTANGLE_REQUEST };

      const currentState = loadBugReportRectangle(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });

  describe('BUG_REPORT_RECTANGLE_SUCCESS', () => {
    it('should return an array of bug reports which located in the area of rectangle', () => {
      const bugReports = [];
      const action = { type: BUG_REPORT_RECTANGLE_SUCCESS, bugReports };
      const expectedState = { ...initialState, isLoading: false };

      const currentState = loadBugReportRectangle(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });

  describe('BUG_REPORT_RECTANGLE_FAILURE', () => {
    it('should change the callbackError status', () => {
      const expectedState = { ...initialState, isLoading: false };
      const action = { type: BUG_REPORT_RECTANGLE_FAILURE };

      const currentState = loadBugReportRectangle(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });
});
