import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from './actions';
import * as api from '../../../api';
import * as apiMock from '../../../__mock__/api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const user = {
  id: 'af6b0b609b7900b89ac395d7c5e4b1a513625bac',
  token: 'fake-jwt-token',
  response: {
    data: {
      message: 'Error!',
    },
  },
};

describe('login', () => {
  it('should login user', async () => {
    // Arrange
    const userName = 'test';
    const password = 'test';
    const errorOccured = false;
    let apiCalled = false;
    const expectedActions = [
      { type: actions.LOGIN_REQUEST },
      {
        type: actions.LOGIN_SUCCESS,
        id: user.id,
        token: user.token,
      },
    ];
    api.login = apiMock.callApiMock(
      { data: { id: user.id, token: user.token }, status: 200 },
      () => {
        apiCalled = true;
      },
    );

    // Act
    const store = mockStore({ id: '', token: '', errorMessage: '' });

    // Assert
    return store.dispatch(actions.login(userName, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(errorOccured).toBeFalsy();
      expect(apiCalled).toBeTruthy();
    });
  });
});

describe('logOut', () => {
  it('should logOut user', async () => {
    // Arrange
    const errorOccured = false;
    const expectedActions = [{ type: actions.LOGOUT_REQUEST }, { type: actions.LOGOUT_SUCCESS }];
    // Act
    const store = mockStore({});
    // Assert
    return store.dispatch(actions.logout()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(errorOccured).toBeFalsy();
    });
  });
});
