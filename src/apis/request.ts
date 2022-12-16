import axios from 'axios';

export const USER_URL = axios.create({
  baseURL: 'http://localhost:5555',
});

