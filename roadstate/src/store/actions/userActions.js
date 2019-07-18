import { userConstants } from '../constants';
import { userService } from '../../services';
import { history } from '../../helpers';
import { async } from 'q';

export const userActions = {
  login,
  logout,
  register
};

function login(username, password) {
  return async dispatch => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      user => {
        dispatch(success(user));
        history.push('/profile');
      },
      error => {
        dispatch(failure(error.toString()));
      }
    );
    // dispatch({ type: userConstants.LOGIN_REQUEST });
    // const result = { status: '200OK', data: 'aaa' };
    // dispatch({ type: userConstants.LOGIN_SUCCESS, userId: result.data });
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

// function logout() {
//   // userService.logout();
//   // return { type: userConstants.LOGOUT };
//   dispatch => {
//     dispatch({ type: LOGOUT_REQUEST });
//     // const response = await sth
//     dispatch({ type: LOGOUT_SUCCESS });
//   };
//   const LOGOUT_REQUEST = 'authorization/LOGOUT_REQUEST';
//   const LOGOUT_SUCCESS = '/authorization/LOGOUT_SUCCESS';
// }

function logout() {
  return async dispatch => {
    dispatch({ type: userConstants.LOGOUT_REQUEST });
    userService.logout();
    // const response = await sth
    dispatch({ type: userConstants.LOGOUT_SUCCESS });
  };
}

function register(user) {
  return dispatch => {
    dispatch(request(user));

    userService.register(user).then(
      user => {
        dispatch(success());
        history.push('/signIn');
      },
      error => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}
