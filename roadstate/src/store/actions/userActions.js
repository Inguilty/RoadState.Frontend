import { userConstants } from '../constants';
import { userService } from '../../services';
import { history } from '../../helpers';

export const userActions = {
  login,
  logout,
  register,
  update
};

function login(username, password) {
  return async dispatch => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      user => {
        dispatch(success(user));
        history.push('/');
      },
      error => {
        dispatch(failure(error.toString()));
      }
    );
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

function logout() {
  return async dispatch => {
    dispatch({ type: userConstants.LOGOUT_REQUEST });
    userService.logout();
    dispatch({ type: userConstants.LOGOUT_SUCCESS });
  };
}

function update(user) {
  return async dispatch => {
    dispatch(request(user));
    userService.update(user).then(user => {
      dispatch(success(user));
    });
  };
  function request(user) {
    return { type: userConstants.UPDATE_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.RUPDATE_SUCCESS, user };
  }
}

function register(user) {
  return async dispatch => {
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
