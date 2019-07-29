import * as userService from '../../../api/index';

export const UPDATE_REQUEST = 'USERS_UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'USERS_UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'USERS_UPDATE_FAILURE';
export const UPDATE_COMPLETED = 'USERS_UPDATE_COMPLETED';
export const update = (id, avatarUrl, oldPassword, newPassword) => async (dispatch) => {
  dispatch({ type: UPDATE_REQUEST });
  const updatedUser = await userService.update(id, avatarUrl, oldPassword, newPassword);
  if (updatedUser.status === 200) {
    dispatch({ type: UPDATE_SUCCESS });
  } else {
    dispatch({ type: UPDATE_FAILURE, errorMessage: updatedUser.response.data.message });
  }
};

export const GET_USER_CREDENTIALS_SUCCESS = 'GET_USER_CREDENTIALS_SUCCESS';
export const GET_USER_CREDENTIALS_FAILURE = 'GET_USER_CREDENTIALS_FAILURE';
export const getUserCredentials = userId => async (dispatch) => {
  const updatedUser = await userService.getUserCredentials(userId);
  if (updatedUser.status === 200) {
    dispatch({
      type: GET_USER_CREDENTIALS_SUCCESS,
      userName: updatedUser.data.userName,
      email: updatedUser.data.email,
    });
  } else {
    dispatch({
      type: GET_USER_CREDENTIALS_FAILURE,
      errorMessage: updatedUser.response.data.message,
    });
  }
};

export const UPDATE_CLOSE_ERROR_ALERT = 'UPDATE_CLOSE_ERROR_ALERT';
export const removeError = () => (dispatch) => {
  dispatch({ type: UPDATE_CLOSE_ERROR_ALERT, errorMessage: '' });
};

export const completeUpdating = () => async (dispatch) => {
  dispatch({ type: UPDATE_COMPLETED });
};
