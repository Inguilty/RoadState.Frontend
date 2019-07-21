import * as userConstants from './userActions';

const initialState = {
  isUpdating: false,
  updated: false,
  user: null,
  errorMessage: '',
};

function updateUserReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.UPDATE_REQUEST:
      return {
        ...state,
        isUpdating: true,
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        updated: true,
        user: action.user,
      };
    case userConstants.UPDATE_COMPLETED:
      return { updated: false };
    case userConstants.UPDATE_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
}

export default updateUserReducer;
