import authorizationReducer from './authorizationReducer';
import * as userActions from './userActions';
import * as api from '../../../api';

describe('authorizationReducer', () => {
  const initialState = {
    loggedIn: false,
    loggingIn: false,
    loggingOut: false,
    userId: '',
    token: '',
  };
  describe('LOGIN_REQUEST', () => {
    it('should change the loading status', () => {
      const expectedState = { ...initialState, loggingIn: true };
      const action = { type: userActions.LOGIN_REQUEST };

      const currentState = authorizationReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });

  describe('LOGIN_SUCCESS', () => {
    it('should return user credentials and set to false loading status', async () => {
      const userName = 'test';
      const password = 'test';
      const userLogin = (await api.login(userName, password)).data;
      const action = {
        type: userActions.LOGIN_SUCCESS,
        id: userLogin.id,
        token: userLogin.token,
      };
      const expectedState = {
        ...initialState,
        loggedIn: true,
        loggingIn: false,
        userId: userLogin.id,
        token: userLogin.token,
      };

      const currentState = authorizationReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });

  describe('LOGIN_FAILURE', () => {
    it('should return error value', () => {
      const action = { type: userActions.LOGIN_FAILURE };
      const expectedState = { ...initialState, loggingIn: false, errorMessage: action.error };

      const currentState = authorizationReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });
});
