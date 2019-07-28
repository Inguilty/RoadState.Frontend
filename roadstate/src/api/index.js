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

export const createBugReport = (createBR) => {
  const data = {
    ProblemLevel: createBR.problemState,
    Description: createBR.description,
    Longitude: createBR.longitude,
    Latitude: createBR.latitude,
    userId: createBR.userId,
  };
  const json = JSON.stringify(data);
  const blob = new Blob([json], {
    type: 'application/json',
  });
  const fd = new FormData();
  fd.append('Data', blob);
  for (let i = 0; i < createBR.photos.length; i += 1) {
    const file = createBR.photos[i];
    fd.append(`Photos[${i}]`, file, file.name);
  }
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };
  return axios.post(`${BASE_URL}api/bugreport`, fd, config);
};

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
