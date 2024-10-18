import axios from "axios";
import { useSelector } from "react-redux";
import { getLocalStorageItem, removeLocalStorageItemsByPrefix } from "./localStorageClient";
import { useNavigate } from "react-router-dom";

const axiosConfig = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:3000",
});

axiosConfig.interceptors.request.use((config) => {
    config.headers = {
      "Content-Type": "application/json"
    }

    if(config.url.includes("config")){
      return config;
    }

    if(config.url.includes("login")){
      return config;
    }

    var user  = getLocalStorageItem('auth')
    if(user?.token){
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    else{
        removeLocalStorageItemsByPrefix()
    }

    return config;
   
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export default axiosConfig;