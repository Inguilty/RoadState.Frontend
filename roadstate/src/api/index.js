import axios from 'axios';

const BASE_URL = '';

export const loginUser = (username, password) =>
  axios.post(`${BASE_URL}/login`);
