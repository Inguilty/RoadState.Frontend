import * as userConstants from './userActions';

const initialState = { loading: false, user: null, errorMessage: '' };

export function updateUserReducer(state = initialState, action) {
  switch (action.type) {
    case userConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
      };
    case userConstants.UPDATE_FAILURE:
      return {
        ...state,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
}
