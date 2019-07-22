import * as userService from '../../../api/index';

export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';
export const login = (username, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  const result = await userService.login(username, password);
  if (result.status === 200 && result.data !== undefined) {
    dispatch({ type: LOGIN_SUCCESS, id: result.data.id, token: result.data.token });
  } else {
    dispatch({ type: LOGIN_FAILURE, errorMessage: result.status });
  }
};

export const LOGOUT_REQUEST = 'USERS_LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'USERS_LOGOUT_SUCCESS';
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  await userService.logout();
  dispatch({ type: LOGOUT_SUCCESS });
};
