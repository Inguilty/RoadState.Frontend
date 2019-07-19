import config from 'react-global-configuration';
import axios from 'axios';
import { users } from '../../__mock__/mockData';

const logout = () => new Promise((resolve) => {
  setTimeout(() => {
    // const user = axios.post(`${config.apiUrl}/users/logout`, requestOptions);
    resolve({
      status: 200,
      response: true,
    });
  }, 2000);
});

const login = (userName, password) => new Promise((resolve) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userName, password }),
  };
  setTimeout(() => {
    // const user = axios.post(`${config.apiUrl}/users/authenticate`, requestOptions);
    resolve({
      status: 200,
      response: users.find(el => el.userName === userName),
    });
  }, 2000);
});

const register = user => new Promise((resolve) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  };

  setTimeout(() => {
    // const user = axios.post(`${config.apiUrl}/users/register`, requestOptions);
    resolve({
      status: 200,
      response: user,
    });
  }, 2000);
});

const update = user => new Promise((resolve) => {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify(user),
  };

  setTimeout(() => {
    // const user = axios.put(`${config.apiUrl}/users/${user.id}`;
    resolve({
      status: 200,
      response: user,
    });
  }, 2000);
});

export const userService = {
  login,
  logout,
  register,
  update,
};
