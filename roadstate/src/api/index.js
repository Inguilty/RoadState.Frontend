import axios from 'axios';

const BASE_URL = '/';
const GOOGLE_MAPS_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';
const publicKey = 'AIzaSyBeFEC_8v3061wgyMUEO6mJ8EmAXzWedTk';

export const loadCurrentRoad = (latitude, longitude) => {
<<<<<<< HEAD
  const rand = () => Math.random()
    .toString(36)
    .substr(2); // remove `0.`
  const token = () => rand() + rand(); // to make it longer
=======
>>>>>>> 5b6684ecc6cd4ea18623272d9c026d3435b8a347
  const headers = {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
<<<<<<< HEAD
    'Access-Control-Allow-Headers': `Content-Type, Access-Control-Allow-Headers, ${token()}, X-Requested-With`,
=======
    'Access-Control-Allow-Headers':
      'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
>>>>>>> 5b6684ecc6cd4ea18623272d9c026d3435b8a347
  };
  return axios.get(`${GOOGLE_MAPS_URL}latlng=${latitude},${longitude}&key=${publicKey}`, headers);
};

export const getBugReportRectangle = (longMin, longMax, latMin, latMax) => axios.get(
  `${BASE_URL}api/bugreport/?longitudemin=${longMin}&longitudemax=${longMax}&latitudemin=${latMin}&latitudemax=${latMax}`,
);

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

export const checkToken = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  return axios.get(`${BASE_URL}api/users/checkToken`).catch(error => error);
};

export const login = (userName, password) => axios.post(`${BASE_URL}api/users/authenticate`, { userName, password }).catch(error => error);

export const register = user => axios.post(`${BASE_URL}api/users/register`, user).catch(error => error);

export const update = (id, avatarUrl, oldPassword, newPassword, token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  return axios
    .put(`${BASE_URL}api/users/${id}/update`, {
      avatarUrl,
      password: oldPassword,
      newPassword,
      id,
    })
    .catch(error => error);
};
