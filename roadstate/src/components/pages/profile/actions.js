import * as userService from '../../../api/index';

export const UPDATE_REQUEST = 'USERS_UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'USERS_UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'USERS_UPDATE_FAILURE';
export const UPDATE_COMPLETED = 'USERS_UPDATE_COMPLETED';
export const update = (id, avatarUrl, oldPassword, newPassword, token) => async (dispatch) => {
  dispatch({ type: UPDATE_REQUEST });
  const updatedUser = await userService.update(id, avatarUrl, oldPassword, newPassword, token);
  if (updatedUser.status === 200) {
    dispatch({ type: UPDATE_SUCCESS, id: updatedUser.data.id, token: updatedUser.data.token });
  } else {
    dispatch({ type: UPDATE_FAILURE, errorMessage: updatedUser.response.data.message });
  }
};

export const UPDATE_REMOVE_ERROR = 'UPDATE_REMOVE_ERROR';
export const removeError = () => (dispatch) => {
  dispatch({ type: UPDATE_REMOVE_ERROR });
};


export const completeUpdating = () => async (dispatch) => {
  dispatch({ type: UPDATE_COMPLETED });
};
