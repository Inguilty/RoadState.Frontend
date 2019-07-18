import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function updateUser(state = initialState, action) {
  switch (action.type) {
    case userConstants.UPDATE_REQUEST:
      return state;
    case userConstants.UPDATE_SUCCESS:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
}
