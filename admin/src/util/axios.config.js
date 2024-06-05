import axios from 'axios'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token=localStorage.getItem("token");
    config.headers.Authorization= `Bearer ${token}`;
    return config;
  }, function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
   
    const {authorization}=response.headers;
    authorization && localStorage.setItem("token",authorization);
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const {status}=error.response;
    if(status===401){
        localStorage.removeItem("token");
        alert("登录已过期，请重新登录")
        // window.location.assign("http://localhost:8080/#/login");
        window.location.href="#/login"
    }
    return Promise.reject(error);
  });