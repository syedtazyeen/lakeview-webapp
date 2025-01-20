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

export default axiosInstance;
