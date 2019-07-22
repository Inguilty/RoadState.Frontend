import updateUserReducer from './updateUserReducer';
import * as actions from './updateUserActions';
import * as api from '../../../api';

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
      const user = {
        userName: 'testUser',
        password: 'test123Q',
        email: 'test@user.com',
      };
      const updatedUser = (await api.update(user)).data;
      const action = {
        type: actions.UPDATE_SUCCESS,
        id: updatedUser.id,
        token: updatedUser.token,
      };
      const expectedState = {
        ...initialState,
        isUpdating: false,
        updated: true,
        userId: updatedUser.id,
        token: updatedUser.token,
      };

      const currentState = updateUserReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });

  describe('UPDATE_FAILURE', () => {
    it('should return error value', async () => {
      const user = {
        userName: 'testUser',
        password: 'test123Q',
        email: 'test@user.com',
      };
      const updatedUser = (await api.update(user)).data;
      const action = { type: actions.UPDATE_FAILURE, errorMessage: updatedUser.error };
      const expectedState = { ...initialState, errorMessage: updatedUser.errorMessage };

      const currentState = updateUserReducer(initialState, action);

      expect(currentState).toEqual(expectedState);
    });
  });
});
