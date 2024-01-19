const axios = require("axios");


const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 5000,
})
console.log('index');

axiosInstance.interceptors.request.use(
    function (config) {
      console.log('Request Interceptor - Original Data:', config.data);
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    function (response) {
      console.log('Response Interceptor - Original Data:', response.data);
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
);


module.exports = axiosInstance;