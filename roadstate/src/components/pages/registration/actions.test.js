import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from './actions';
import * as api from '../../../api/index';
import * as apiMock from '../../../__mock__/api';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('registration', () => {
  it('should register user', async () => {
    // Arrange
    const user = {
      id: 'af6b0b609b7900b89ac395d7c5e4b1a513625bac',
      token: 'fake-jwt-token',
      errorMessage: '',
    };
    const errorOccured = false;
    let apiCalled = false;
    const expectedActions = [
      { type: actions.REGISTER_REQUEST, user },
      {
        type: actions.REGISTER_SUCCESS,
      },
    ];
    api.register = apiMock.callApiMock({ data: null, status: 200 }, () => {
      apiCalled = true;
    });
    // Act
    const store = mockStore({ id: '', token: '' });
    // Assert
    return () => store.dispatch(actions.userActions.register(user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(errorOccured).toBeFalsy();
      expect(apiCalled).toBeTruthy();
    });
  });
});
