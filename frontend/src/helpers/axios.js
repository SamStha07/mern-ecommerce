import axios from 'axios';
// import { api } from '../urlConfig';

// const token = window.localStorage.getItem('token');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  //   headers: {
  //     Authorization: token ? `Bearer ${token}` : '',
  //   },
});

export default axiosInstance;
