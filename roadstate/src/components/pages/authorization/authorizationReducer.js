import * as userConstants from './userActions';

const initialState = { loggedIn: false, user: null };

export function authorizationReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user,
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
