import * as userService from '../../../api/index';

export const UPDATE_REQUEST = 'USERS_UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'USERS_UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'USERS_UPDATE_FAILURE';
export const UPDATE_COMPLETED = 'USERS_UPDATE_COMPLETED';
export const update = user => async (dispatch) => {
  dispatch({ type: UPDATE_REQUEST, user });
  const updatedUser = await userService.update(user);
  if (updatedUser.status === 200) {
    dispatch({ type: UPDATE_SUCCESS, id: updatedUser.data.id, token: updatedUser.data.token });
  } else {
    dispatch({ type: UPDATE_FAILURE, errorMessage: updatedUser.error });
  }
};
export const completeUpdating = () => async (dispatch) => {
  dispatch({ type: UPDATE_COMPLETED });
};
