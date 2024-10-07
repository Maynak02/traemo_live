import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_APP_HOST_API,
});

export default axiosInstance;
