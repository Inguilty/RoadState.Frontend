import axios from 'axios';

const BASE_URL = '/';
const GOOGLE_MAPS_URL = 'https://maps.googleapis.com/maps/api/geocode/json?';
const publicKey = 'AIzaSyBeFEC_8v3061wgyMUEO6mJ8EmAXzWedTk';

export const loadCurrentRoad = (latitude, longitude) => axios.get(`${GOOGLE_MAPS_URL}latlng=${latitude},${longitude}&key=${publicKey}`);

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
