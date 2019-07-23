import * as userConstants from './updateUserActions';

const initialState = {
  isUpdating: false,
  updated: false,
  userId: '',
  token: '',
  errorMessage: '',
};

const updateUserReducer = (state = initialState, action) => {
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
        userId: action.id,
        token: action.token,
      };
    case userConstants.UPDATE_COMPLETED:
      return { ...state, updated: false };
    case userConstants.UPDATE_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

export default updateUserReducer;
