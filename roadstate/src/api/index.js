import axios from 'axios';

const BASE_URL = '/';

export const loadCurrentRoad = (latitude, longitude) => axios.get(`${BASE_URL}api/bugreport/coords?longitude=${longitude}&latitude=${latitude}`);

export const loadCurrentUser = userId => axios.get(`${BASE_URL}api/users/${userId}`);

export const addComment = (bugReportId, comment) => {
  const config = {
    headers: { 'content-type': 'application/json' },
  };
  return axios.post(
    `${BASE_URL}api/bugreport/${bugReportId}/comment`,
    JSON.stringify(comment),
    config,
  );
};

export const getBugReportRectangle = (longMin, longMax, latMin, latMax) => axios.get(
  `${BASE_URL}api/bugreport/?longitudemin=${longMin}&longitudemax=${longMax}&latitudemin=${latMin}&latitudemax=${latMax}`,
);

export const loadBugReport = (id, userId) => axios.get(`${BASE_URL}api/bugreport/${id}?userId=${userId}`);

export const rateBugReport = (id, rate, token) => {
  const config = {
    headers: { 'content-type': 'application/json' },
  };
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  return axios.post(
    `${BASE_URL}api/bugreport/${id}/rate?`,
    JSON.stringify({ rate, id, token }),
    config,
  );
};

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
