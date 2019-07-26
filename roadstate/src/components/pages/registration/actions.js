import * as userService from '../../../api/index';

export const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'USERS_REGISTER_FAILURE';

export const register = user => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST, user });
  const registeredUser = await userService.register(user);
  if (registeredUser.status === 200) {
    dispatch({ type: REGISTER_SUCCESS });
  } else {
    dispatch({ type: REGISTER_FAILURE, errorMessage: registeredUser.response.data.message });
  }
};

export const REGISTER_REMOVE_ERROR = 'REGISTER_REMOVE_ERROR';
export const removeError = () => (dispatch) => {
  dispatch({ type: REGISTER_REMOVE_ERROR });
};

export const REGISTER_COMPLETED = 'USERS_REGISTER_COMPLETED';
export const completeRegistration = () => (dispatch) => {
  dispatch({ type: REGISTER_COMPLETED });
};
