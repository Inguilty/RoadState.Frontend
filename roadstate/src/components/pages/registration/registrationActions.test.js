import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from './registrationActions';
import * as api from '../../../api/index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('registration', () => {
  it('should register user', async () => {
    // Arrange
    const user = {
      userName: 'testUser',
      password: 'test123Q',
      email: 'test@user.com',
    };
    const errorOccured = false;
    const expectedRegistrationResult = await api.register(user);
    const expectedActions = [
      {
        type: actions.REGISTER_SUCCESS,
        id: expectedRegistrationResult.data.id,
        token: expectedRegistrationResult.data.token,
      },
    ];
    // Act
    const store = mockStore({ id: '', token: '' });
    // Assert
    return () => store.dispatch(actions.userActions.register(user)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      expect(errorOccured).toBeFalsy();
    });
  });
});
