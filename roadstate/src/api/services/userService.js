import config from 'react-global-configuration';
import axios from 'axios';
import { users } from '../../__mock__/mockData';

const logout = () => new Promise((resolve) => {
  setTimeout(() => {
    // const result = axios.post(`${config.apiUrl}/users/logout`);
    resolve({
      status: 200,
      data: true,
    });
  }, 2000);
});

const login = (userName, password) => new Promise((resolve) => {
  setTimeout(() => {
    // const result = axios.post(`${config.apiUrl}/users/authenticate`, userName);
    resolve({
      status: 200,
      data: users.find(el => el.userName === userName),
    });
  }, 2000);
});

const register = user => new Promise((resolve) => {
  setTimeout(() => {
    // const result = axios.post(`${config.apiUrl}/users/register`, user);
    resolve({
      status: 200,
      data: user,
    });
  }, 2000);
});

const update = user => new Promise((resolve) => {
  setTimeout(() => {
    // const result = axios.put(`${config.apiUrl}/users/${user.id}`, user);
    resolve({
      status: 200,
      data: user,
    });
  }, 2000);
});

export const userService = {
  login,
  logout,
  register,
  update,
};
