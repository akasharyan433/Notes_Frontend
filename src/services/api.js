import axios from 'axios';

// Get API base URL from environment variables or use default localhost
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Configure axios instance with base settings
 * - Base URL for all API requests
 * - Default headers for JSON content
 */
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Global response interceptor for error handling
 * - Logs API errors to console
 * - Preserves error response for component-level handling
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;