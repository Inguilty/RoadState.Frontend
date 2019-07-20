import * as userConstants from './userActions';

const initialState = {
  loggingOut: true,
};

export const logOutReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGOUT_REQUEST:
      return state;
    case userConstants.LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        userId: '',
        token: '',
      };
    default:
      return state;
  }
};
