import updateUserReducer from './reducer';
import * as actions from './actions';

const user = {
  userName: 'testUser',
  email: 'test@user.com',
  errorMessage: '',
};

describe('updateUserReducer', () => {
  const initialState = {
    isUpdating: false,
    updated: false,
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
      };
      const expectedState = {
        ...initialState,
        isUpdating: false,
        updated: true,
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
