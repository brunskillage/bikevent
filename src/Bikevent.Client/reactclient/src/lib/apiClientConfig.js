import axios from "axios";
import { useSelector } from "react-redux";

const axiosConfig = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:3000",
});

axios.interceptors.request.use(function (config) {
    var token = useSelector(state => state.user.token)
    config.headers.Authorization = token;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export default axiosConfig;