import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [gym, setGym] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await authAPI.getMe();
        setGym(response.data);
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('gym');
      }
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    const response = await authAPI.login({ email, password });
    const { token, ...gymData } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('gym', JSON.stringify(gymData));
    setGym(gymData);
    return response.data;
  };

  const register = async (data) => {
    const response = await authAPI.register(data);
    const { token, ...gymData } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('gym', JSON.stringify(gymData));
    setGym(gymData);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('gym');
    setGym(null);
  };

  const value = {
    gym,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!gym
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
