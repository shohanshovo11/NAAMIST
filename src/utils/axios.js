import axios from "axios";
import config from "./../config";
import { getAuthTokenFromCookie } from "./getAuthTokenFromCookie";

// Create an Axios instance
const Axios = axios.create({
  baseURL: config.API_BASE_URL,
});

Axios.interceptors.request.use(
  (config) => {
    const token = getAuthTokenFromCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Axios;
