/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate ? useNavigate() : null;

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

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

  const logout = useCallback(() => {
    setToken(null);
    setCurrentUser(null);
    if (navigate) navigate('/login');
    toast.info('Logged out successfully');
  }, [navigate]);

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