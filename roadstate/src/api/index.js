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
