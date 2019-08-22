import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.breakingbadapi.com/api/'
});

export default api;