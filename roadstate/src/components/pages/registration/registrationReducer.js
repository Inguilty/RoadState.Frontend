import * as userConstants from './registrationActions';

const initialState = { isRegistering: false, registered: false, errorMessage: '' };

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { ...state, isRegistering: true };
    case userConstants.REGISTER_SUCCESS:
      return { ...state, isRegistering: false, registered: true };
    case userConstants.REGISTER_COMPLETED:
      return { ...state, registered: false };
    case userConstants.REGISTER_FAILURE:
      return { ...state, errorMessage: action.errorMessage };
    default:
      return state;
  }
};

export default registrationReducer;
