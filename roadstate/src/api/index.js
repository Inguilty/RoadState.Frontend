import axios from 'axios';
import { bugReports } from '../__mock__/mockData';

const BASE_URL = '';

export const loginUser = () => axios.post(`${BASE_URL}/login`);

export const loadBugReport = id => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      status: 200,
      data: bugReports.find(x => x.id === id),
    });
  }, 2000);
});

export const rateBugReport = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      status: 200,
      data: null,
    });
  }, 2000);
});
