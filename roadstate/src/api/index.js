import axios from 'axios';
import { bugReports, users } from '../__mock__/mockData';

const BASE_URL = '';

export const loadBugReport = id => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      status: 200,
      response: bugReports.find(x => x.id === id),
    });
  }, 2000);
});

export const logout = () => new Promise((resolve) => {
  setTimeout(() => {
    // const result = axios.post(`${config.apiUrl}/users/logout`);
    resolve({
      status: 200,
      data: true,
    });
  }, 2000);
});

export const login = (userName, password) => new Promise((resolve) => {
  setTimeout(() => {
    // const result = axios.post(`${config.apiUrl}/users/authenticate`, userName);
    resolve({
      status: 200,
      data: users.find(el => el.userName === userName),
    });
  }, 2000);
});

export const register = user => new Promise((resolve) => {
  setTimeout(() => {
    // const result = axios.post(`${config.apiUrl}/users/register`, user);
    resolve({
      status: 200,
      data: user,
    });
  }, 2000);
});

export const update = user => new Promise((resolve) => {
  setTimeout(() => {
    // const result = axios.put(`${config.apiUrl}/users/${user.id}`, user);
    resolve({
      status: 200,
      data: user,
    });
  }, 2000);
});
