import { userService } from '../../../api/services';

export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';
const login = (userName, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  const user = await userService.login(userName, password);
  if (user.status === 200) {
    dispatch({ type: LOGIN_SUCCESS, user });
  } else {
    dispatch({ type: LOGIN_FAILURE, error: user.error });
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
const update = user => async (dispatch) => {
  dispatch({ type: UPDATE_REQUEST, user });
  const updatedUser = await userService.update(user);
  if (updatedUser.status === 200) {
    dispatch({ type: UPDATE_SUCCESS, updatedUser });
  } else {
    dispatch({ type: UPDATE_FAILURE, error: user.error });
  }
};

export const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'USERS_REGISTER_FAILURE';
const register = user => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST, user });
  const registeredUser = await userService.register(user);
  if (registeredUser.status === 200) {
    dispatch({ type: REGISTER_SUCCESS, user });
  } else {
    dispatch({ type: REGISTER_FAILURE, error: registeredUser.error });
  }
};

export const userActions = {
  login,
  logout,
  register,
  update,
};
