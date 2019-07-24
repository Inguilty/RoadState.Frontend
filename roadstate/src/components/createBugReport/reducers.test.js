import createBugReportReducer from './reducers';
import {
  CREATE_BUG_REPORT_REQUEST,
  CREATE_BUG_REPORT_SUCCESS,
  CREATE_BUG_REPORT_FAILURE,
} from './actions';

describe('createBugReportReducer', () => {
  const initialStateDefault = {
    isLoading: false,
    isFailed: false,
  };
  const initialStateFailed = {
    isLoading: false,
    isFailed: true,
  };
  describe('CREATE_BUG_REPORT_REQUEST - DEFAULT', () => {
    it('should change the loading status and failure status should stay the same', () => {
      const expectedState = { ...initialStateDefault, isLoading: true, isFailed: false };
      const action = { type: CREATE_BUG_REPORT_REQUEST };

      const currentState = createBugReportReducer(initialStateDefault, action);

      expect(currentState).toEqual(expectedState);
    });
  });

  describe('CREATE_BUG_REPORT_REQUEST - FAILED', () => {
    it('should change the loading status and failure status should shange too', () => {
      const expectedState = { ...initialStateFailed, isLoading: true, isFailed: false };
      const action = { type: CREATE_BUG_REPORT_REQUEST };

      const currentState = createBugReportReducer(initialStateFailed, action);

      expect(currentState).toEqual(expectedState);
    });
  });

  describe('CREATE_BUG_REPORT_SUCCESS', () => {
    it('should change the loading status and failure status should stay the same', async () => {
      const action = { type: CREATE_BUG_REPORT_SUCCESS };
      const expectedState = { ...initialStateDefault, isLoading: false, isFailed: false };

      const currentState = createBugReportReducer(initialStateDefault, action);

      expect(currentState).toEqual(expectedState);
    });
  });

  describe('CREATE_BUG_REPORT_FAILURE', () => {
    it('should NOT change the loading status and failure status should stay the same', () => {
      const action = { type: CREATE_BUG_REPORT_FAILURE };
      const expectedState = { ...initialStateDefault, isLoading: false, isFailed: true };

      const currentState = createBugReportReducer(initialStateDefault, action);

      expect(currentState).toEqual(expectedState);
    });
  });
});
