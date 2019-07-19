import * as userConstants from './userActions';
import { users } from '../../../__mock__/mockData';

const initialValue = users.username === 'test';
const initialState = { loggedIn: true, initialValue };

export function updateUserReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.UPDATE_REQUEST:
      return state;
    case userConstants.UPDATE_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}
