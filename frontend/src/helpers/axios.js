import axios from 'axios';

// const token = window.localStorage.getItem('token');
// console.log(user);

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  // headers: {
  //   Authorization: token ? `Bearer ${token}` : '',
  // },
});

export default axiosInstance;
