import registrationUserReducer from './registrationReducer';
import * as actions from './registrationActions';
import * as api from '../../../api';

describe('registrationUserReducer', () => {
  const initialState = {
    isRegistering: false,
    registered: false,
    error: '',
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
      const user = {
        userName: 'testUser',
        password: 'test123Q',
        email: 'test@user.com',
      };
      const registeredUser = (await api.register(user)).data;
      const expectedState = { ...initialState, errorMessage: registeredUser.errorMessage };
      const action = { type: actions.REGISTER_FAILURE, errorMessage: registeredUser.error };

      const currentState = registrationUserReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });
});
