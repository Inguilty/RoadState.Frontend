import axios from 'axios';

const BASE_URL = '';

export const loginUser = () => axios.post(`${BASE_URL}/login`);
