import axios from "axios";

const API = axios.create({
  baseURL: "http://backend.myDomain.local:5000",
  withCredentials: true, // This ensures cookies are sent with requests
});

// Add a request interceptor to handle authentication
API.interceptors.request.use(
  (config) => {
    // No need to manually set Authorization header as cookies will be sent automatically
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle authentication errors
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (e.g., redirect to login)
    if (error.response && error.response.status === 401) {
      // Redirect to login page if needed
      // window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default API;
