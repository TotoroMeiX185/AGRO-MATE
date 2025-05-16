import axios from 'axios';
import apiClient from '../utils/apiClient';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  const login = async (nic, password) => {
    setLoading(true);
    try {
      //Use standard axios for login as we don't have a token yet
      const res = await axios.post('/api/auth/login', {
        nic,
        password
      });

    const { user, token} = res.data;

      console.log('Login response from server:',res.data);

    if (!user || !user.role) {
      throw new Error('Role not found in response');
    }

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token',token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // <-- Add this
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
    

    return user;

  } catch (error) {
    console.error('Login error:', error);
    setError(error?.response?.data?.message || error.message || 'Login failed');
    throw error;
  } finally {
    setLoading(false);
  }
  };

  // Define logout BEFORE useEffect
const logout = () => {
  setUser(null);
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  axios.defaults.headers.common['Authorization'] = '';
  apiClient.defaults.headers.common['Authorization'] = '';
};



  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storeToken =localStorage.getItem('token');

    if (storedUser && storeToken) {
      setUser(JSON.parse(storedUser));
        //set token in axios headers for subsequent requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${storeToken}`; // <-- Add this
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${storeToken}`;
    } else {
      setUser(null);
      axios.defaults.headers.common['Authorization'] = '';
      apiClient.defaults.headers.common['Authorization'] = '';
    }

    setAuthReady(true);
  }, []);

  const isAuthenticated = !!user && !!localStorage.getItem('token');

  const value ={
    user,
    loading,
    setLoading,
    login,
    logout,
    error,  
    authReady,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
      