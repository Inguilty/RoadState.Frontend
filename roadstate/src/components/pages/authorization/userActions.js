import { userService } from '../../../api/services';

export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';
const login = (username, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  const result = await userService.login(username, password);
  if (result.status === 200 && result.data !== undefined) {
    dispatch({ type: LOGIN_SUCCESS, id: result.data.id, token: result.data.token });
  } else {
    dispatch({ type: LOGIN_FAILURE, errorMessage: result.error });
  }
};

export const LOGOUT_REQUEST = 'USERS_LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'USERS_LOGOUT_SUCCESS';
const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  await userService.logout();
  dispatch({ type: LOGOUT_SUCCESS });
};

export const UPDATE_REQUEST = 'USERS_UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'USERS_UPDATE_SUCCESS';
export const UPDATE_FAILURE = 'USERS_UPDATE_FAILURE';
export const UPDATE_COMPLETED = 'USERS_UPDATE_COMPLETED';
const update = user => async (dispatch) => {
  dispatch({ type: UPDATE_REQUEST, user });
  const updatedUser = await userService.update(user);
  if (updatedUser.status === 200) {
    dispatch({ type: UPDATE_SUCCESS, user: updatedUser.response });
  } else {
    dispatch({ type: UPDATE_FAILURE, errorMessage: updatedUser.error });
  }
};
const completeUpdating = () => async (dispatch) => {
  dispatch({ type: UPDATE_COMPLETED });
};

export const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'USERS_REGISTER_FAILURE';
export const REGISTER_COMPLETED = 'USERS_REGISTER_COMPLETED';
const register = user => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST, user });
  const registeredUser = await userService.register(user);
  if (registeredUser.status === 200) {
    dispatch({ type: REGISTER_SUCCESS, user: registeredUser.response });
  } else {
    dispatch({ type: REGISTER_FAILURE, errorMessage: registeredUser.error });
  }
};
const completeRegistration = () => async (dispatch) => {
  dispatch({ type: REGISTER_COMPLETED });
};

export const userActions = {
  login,
  logout,
  register,
  completeRegistration,
  update,
  completeUpdating,
};
