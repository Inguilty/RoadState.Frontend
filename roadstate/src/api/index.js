import axios from 'axios';

const BASE_URL = '/';

export const loadBugReport = id => axios.get(`${BASE_URL}api/bugreport/${id}`);

export const rateBugReport = (id, rate) => axios.put(`${BASE_URL}api/bugreport/${id}/rate`, rate);

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
