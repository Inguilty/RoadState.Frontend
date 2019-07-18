import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};
// const initialState = {
//   isFetching: false,
//   userId: ''
// };

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      // return { ...state, isFetching: true };
      return {
        ...state,
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      // return { ...state, user: action.user, isFetching: false };
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return state;
    case userConstants.LOGOUT_REQUEST:
      return state;
    case userConstants.LOGOUT_SUCCESS:
      return { ...state, loggedIn: false, user: null };
    default:
      return state;
  }
}
