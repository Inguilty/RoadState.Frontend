import axios from 'axios';

const BASE_URL = '/';

export const loadBugReport = id => axios.get(`${BASE_URL}api/bugreport/${id}`);

export const rateBugReport = (id, rate) => axios.post(`${BASE_URL}api/bugreport/${id}/rate`, rate);

export const createBugReport = (createBR) => {
  const data = {
    ProblemLevel: createBR.problemLevel,
    Description: createBR.description,
    Longitude: createBR.longitude,
    Latitude: createBR.latitude,
  };
  debugger;
  const json = JSON.stringify(data);
  const blob = new Blob([json], {
    type: 'application/json',
  });
  const fd = new FormData();
  fd.append('Data', blob);
  for (let i = 0; i < createBR.photos.length; i += 1) {
    const file = createBR.photos.item(i);
    fd.append(`Photos[${i}]`, file, file.name);
  }
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      let percentCompleted = Math.floor(progressEvent.loaded * 100 / progressEvent.total);
      console.log(percentCompleted);
    }
  };
  return axios.post(`${BASE_URL}api/createbugreport`, fd, config)
    .then(responce => console.log(responce))
    .catch(responce => console.log(responce));
};

export const logout = () => new Promise((resolve) => {
  setTimeout(() => {
    // const result = axios.post(`${config.apiUrl}/users/logout`);
    resolve({
      status: 200,
      data: null,
    });
  }, 2000);
});

export const login = () => new Promise((resolve) => {
  setTimeout(() => {
    // const result = axios.post(`${config.apiUrl}/users/authenticate`, userName);
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

export const register = () => new Promise((resolve) => {
  setTimeout(() => {
    // const result = axios.post(`${config.apiUrl}/users/register`, user);
    resolve({
      status: 200,
      data: null,
    });
  }, 2000);
});

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
