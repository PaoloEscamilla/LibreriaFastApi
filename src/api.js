import axios from 'axios';

const api = axios.create({
  baseURL: 'http://165.22.16.179:5000',
});

export default api;