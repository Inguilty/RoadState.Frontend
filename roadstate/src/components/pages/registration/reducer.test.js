import registrationUserReducer from './reducer';
import * as actions from './actions';

describe('registrationUserReducer', () => {
  const initialState = {
    isRegistering: false,
    registered: false,
    errorMessage: '',
  };
  describe('REGISTER_REQUEST', () => {
    it('should change the loading status', () => {
      const expectedState = { ...initialState, isRegistering: true };
      const action = { type: actions.REGISTER_REQUEST };

      const currentState = registrationUserReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });

  describe('REGISTER_SUCCESS', () => {
    it('should return new user credentials and set to false loading status', async () => {
      const expectedState = { ...initialState, isRegistering: false, registered: true };
      const action = { type: actions.REGISTER_SUCCESS };

      const currentState = registrationUserReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });

  describe('REGISTER_FAILURE', () => {
    it('should return error value', async () => {
      const errorMessage = '';
      const expectedState = { ...initialState, errorMessage };
      const action = { type: actions.REGISTER_FAILURE, errorMessage };

      const currentState = registrationUserReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });
});
