import axios from 'axios';

const BASE_URL = 'http://localhost:57283/';

export const loadBugReport = id => axios.get(`${BASE_URL}api/bugreport/${id}`);

export const rateBugReport = (id, rate) => axios.post(`${BASE_URL}api/bugreport/${id}/rate`, rate);

export const createBugReport = () => new Promise((resolve) => {
  /* const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };
  return axios.post(`${BASE_URL}/createBugReport`, createBR.photosData, config); */
  setTimeout(() => {
    resolve({
      status: 200,
    });
  }, 2000);
});

export const logout = () => new Promise((resolve) => {
  setTimeout(() => {
    // const result = axios.post(`${config.apiUrl}/users/logout`);
    resolve({
      status: 200,
      data: null,
    });
  }, 2000);
});

export const login = (userName, password) => axios.post(`${BASE_URL}api/users/authenticate`, { userName, password }).catch(error => error);

export const register = user => axios.post(`${BASE_URL}api/users/register`, user).catch(error => error);

export const update = () => new Promise((resolve) => {
  setTimeout(() => {
    // const result = axios.put(`${config.apiUrl}/users/${user.id}`, user);
    resolve({
      status: 200,
      data: {
        id: 'af6b0b609b7900b89ac395d7c5e4b1a513625bac',
        token: 'fake-jwt-token',
        errorMessage: '',
      },
    });
  }, 2000);
});
