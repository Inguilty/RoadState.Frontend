import updateUserReducer from './reducer';
import * as actions from './actions';

const user = {
  id: 'af6b0b609b7900b89ac395d7c5e4b1a513625bac',
  token: 'fake-jwt-token',
  errorMessage: '',
};

describe('updateUserReducer', () => {
  const initialState = {
    isUpdating: false,
    updated: false,
    userId: '',
    token: '',
    errorMessage: '',
  };
  describe('UPDATE_REQUEST', () => {
    it('should change the loading status', () => {
      const expectedState = { ...initialState, isUpdating: true };
      const action = { type: actions.UPDATE_REQUEST };

      const currentState = updateUserReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });

  describe('UPDATE_SUCCESS', () => {
    it('should return new user credentials and set to false loading status', async () => {
      const action = {
        type: actions.UPDATE_SUCCESS,
        id: user.id,
        token: user.token,
      };
      const expectedState = {
        ...initialState,
        isUpdating: false,
        updated: true,
        userId: user.id,
        token: user.token,
      };

      const currentState = updateUserReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });

  describe('UPDATE_FAILURE', () => {
    it('should return error value', async () => {
      const action = { type: actions.UPDATE_FAILURE, errorMessage: user.errorMessage };
      const expectedState = { ...initialState, errorMessage: user.errorMessage };

      const currentState = updateUserReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });
});
