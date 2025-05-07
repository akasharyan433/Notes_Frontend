/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

// Create authentication context
export const AuthContext = createContext();

/**
 * AuthProvider component manages authentication state and provides auth-related functions
 * to the entire application through React Context
 */
export const AuthProvider = ({ children }) => {
  // Authentication state
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate ? useNavigate() : null;

  // Update API headers and local storage when token changes
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Load user data when token is available
  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      if (token) {
        try {
          const res = await api.get('/auth/me');
          setCurrentUser(res.data.user);
        } catch (err) {
          console.error('Failed to load user', err);
          setToken(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} Registration response
   */
  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      const res = await api.post('/auth/register', userData);
      setToken(res.data.token);
      setCurrentUser(res.data.user);
      toast.success('Successfully registered!');
      if (navigate) navigate('/notes');
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  /**
   * Login an existing user
   * @param {Object} userData - User login credentials
   * @returns {Promise} Login response
   */
  const login = useCallback(async (userData) => {
    try {
      setLoading(true);
      const res = await api.post('/auth/login', userData);
      setToken(res.data.token);
      setCurrentUser(res.data.user);
      toast.success('Successfully logged in!');
      if (navigate) navigate('/notes');
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  /**
   * Logout current user and clear authentication state
   */
  const logout = useCallback(() => {
    setToken(null);
    setCurrentUser(null);
    if (navigate) navigate('/login');
    toast.info('Logged out successfully');
  }, [navigate]);

  // Provide authentication context to children
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        token,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};