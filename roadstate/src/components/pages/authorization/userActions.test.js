import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from './userActions';
import * as api from '../../../api/index';
import * as apiMock from '../../../__mock__/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('login', () => {
  it('should login user', async () => {
    // Arrange
    const userName = 'test';
    const password = 'test';
    const errorOccured = false;
    const expectedLoginResult = (await api.login(userName, password)).data;
    const expectedActions = [
      { type: actions.LOGIN_REQUEST },
      {
        type: actions.LOGIN_SUCCESS,
        id: expectedLoginResult.id,
        token: expectedLoginResult.token,
      },
    ];

    // Act
    const store = mockStore({ id: '', token: '' });

    // Assert
    return store.dispatch(actions.login(userName, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(errorOccured).toBeFalsy();
    });
  });
});

describe('login', () => {
  it('should not login user', async () => {
    // Arrange
    const userName = 'testt';
    const password = 'test';
    const errorOccured = false;
    const expectedLoginResult = await api.login(userName, password);

    const expectedActions = [
      { type: actions.LOGIN_REQUEST },
      {
        type: actions.LOGIN_FAILURE,
        errorMessage: expectedLoginResult.status,
      },
    ];
    // Act
    const store = mockStore({ errorMessage: '' });
    // Assert
    return store.dispatch(actions.login(userName, password)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(errorOccured).toBeFalsy();
    });
  });
});

describe('logOut', () => {
  it('should logOut user', async () => {
    // Arrange
    const errorOccured = false;
    const expectedActions = [{ type: actions.LOGOUT_REQUEST }, { type: actions.LOGOUT_SUCCESS }];
    // Act
    const store = mockStore({ id: '', token: '' });
    // Assert
    return store.dispatch(actions.logout()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(errorOccured).toBeFalsy();
    });
  });
});
