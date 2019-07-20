import * as userConstants from './userActions';

const initialState = {
  loggedIn: false,
  loggingIn: false,
  userId: '',
  token: '',
};

export const authorizationReducer = (state = initialState, action) => {
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
        loggingIn: false,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};
