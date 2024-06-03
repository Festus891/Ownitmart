import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = "https://ownitmart-backend.onrender.com/api/v1";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = Cookies.get("token");

    if (token) {
      console.log("Token found, adding to request headers");
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.log("No token found");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 Unauthorized response globally
      console.error("Unauthorized, logging out...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
