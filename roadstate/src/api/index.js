import axios from 'axios';
import { bugReports } from '../__mock__/mockData';

const BASE_URL = '';

export const loginUser = () => axios.post(`${BASE_URL}/login`);

export const loadBugReport = id => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      status: 200,
      response: bugReports.find(x => x.id === id),
    });
  }, 2000);
});

export const createBugReport = createBR => new Promise((resolve) => {
  /* const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };
  return axios.post(`${BASE_URL}/createBugReport`, createBR.photosData, config); */
  console.log(createBR);
  setTimeout(() => {
    resolve({
      status: 200,
    });
  }, 2000);
});
