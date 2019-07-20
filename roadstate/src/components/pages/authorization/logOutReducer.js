import * as userConstants from './userActions';

const initialState = {
  loggedIn: true,
};

export const logOutReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGOUT_REQUEST:
      return state;
    case userConstants.LOGOUT_SUCCESS:
      return { ...state, loggedIn: false, user: null };
    default:
      return state;
  }
};
