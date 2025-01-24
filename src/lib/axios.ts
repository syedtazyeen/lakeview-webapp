import axios from "axios";
import Cookies from "js-cookie";
import { COOKIES } from "./constants";

const url = process.env.NEXT_PUBLIC_API_BASE_URL;

const authToken = Cookies.get(COOKIES.AUTH_TOKEN);

const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove(COOKIES.AUTH_TOKEN);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
