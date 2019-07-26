import authorizationReducer from './reducer';
import * as userActions from './actions';

const user = {
  id: 'af6b0b609b7900b89ac395d7c5e4b1a513625bac',
  token: 'fake-jwt-token',
  errorMessage: '',
};

describe('authorizationReducer', () => {
  const initialState = {
    loggedIn: false,
    loggingIn: false,
    loggingOut: false,
    userId: '',
    token: '',
    errorMessage: '',
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
      const action = {
        type: userActions.LOGIN_SUCCESS,
        id: user.id,
        token: user.token,
      };
      const expectedState = {
        ...initialState,
        loggedIn: true,
        loggingIn: false,
        userId: user.id,
        token: user.token,
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
