import * as userConstants from './userActions';

const initialState = { isRegistering: false, registered: false };

function registrationReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { isRegistering: true };
    case userConstants.REGISTER_SUCCESS:
      return { isRegistering: false, registered: true };
    case userConstants.REGISTER_COMPLETED:
      return { registered: false };
    case userConstants.REGISTER_FAILURE:
      return { errorMessage: action.errorMessage };
    default:
      return state;
  }
}

export default registrationReducer;
