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

export const createBugReport = (createBR) => {
  const data = new FormData();
  for (let i = 0; i < createBR.files.length; i += 1) {
    const file = createBR.files.item(i);
    data.append(`photos[${i}]`, file, file.name);
  }
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };
  return axios.post(`${BASE_URL}/createBugReport`, data, config);
};
