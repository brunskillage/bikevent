import axios from "axios";
import { getLocalStorageItem, removeLocalStorageItemsByPrefix } from "./localStorageClient";
import { globaldispatch, globalNavigate } from "./globalHooks";
import { setError } from "../store/utilSlice";

//const https = require('https');

// const agent = new https.Agent({
//   rejectUnauthorized: false,
//   requestCert: false,
//   agent: false,
// });

const axiosConfig = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://192.168.1.74:3000",
  //httpsAgent: agent
});

axiosConfig.interceptors.request.use((config) => {
  console.log("using interceptor")
  config.headers = {
    "Content-Type": "application/json"
  }

  if (config.url.includes("config")) {
    return config;
  }

  if (config.url.includes("login")) {
    return config;
  }

  var user = getLocalStorageItem('auth')
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  else {
    removeLocalStorageItemsByPrefix()
  }

  return config;

});

// Add a response interceptor
axiosConfig.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.log("error")
  globaldispatch(setError(error))
  globalNavigate("/error")
  return Promise.resolve(false);
});

export default axiosConfig;