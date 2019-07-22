import axios from 'axios';

const BASE_URL = '/';

export const loadBugReport = id => axios.get(`${BASE_URL}api/bugreport/${id}`);

export const loginUser = () => axios.post(`${BASE_URL}/login`);

export const rateBugReport = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      status: 200,
      data: null,
    });
  }, 2000);
});
