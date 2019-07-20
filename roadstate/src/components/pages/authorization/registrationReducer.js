import * as userConstants from './userActions';

const initialState = { isRegistering: false };

export function registrationReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { isRegistering: true };
    case userConstants.REGISTER_SUCCESS:
      return { isRegistering: false };
    case userConstants.REGISTER_FAILURE:
      return { errorMessage: action.errorMessage };
    default:
      return state;
  }
}
