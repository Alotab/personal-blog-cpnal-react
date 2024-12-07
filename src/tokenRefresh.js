
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',  // Change to your base Django API URL
});

// Add a request interceptor to include the access token
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Add a response interceptor to handle token expiration (401 errors)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is 401 (Unauthorized), and it hasn't been retried yet
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;  // Mark this request as "retrying"
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          // Send a request to the refresh endpoint to get a new access token
          const response = await axios.post('http://127.0.0.1:8000/auth/jwt/refresh/', {
            refresh: refreshToken
          });

          // Save the new access token
          localStorage.setItem('access_token', response.data.access);

          // Update the failed request with the new access token
          originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

          // Retry the original request with the new token
          return axios(originalRequest);
        } catch (err) {
          console.error('Error refreshing token:', err);
          // Optionally handle the error, e.g., log the user out or show a message
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
