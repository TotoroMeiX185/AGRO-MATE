import axios from 'axios';
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

  const login = async (NIC, password) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        NIC,
        password
      });

    const data =res.data;
    console.log('Login response from server:', data);

    if (!data.user || !data.user.role) {
      throw new Error('Role not found in response');
    }

    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
    setUser(data.user);

    return data.user;

  } catch (error) {
    console.error('Login error:', error);
    throw error;
  } finally {
    setLoading(false);
  }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value ={
    user,
    loading,
    setLoading,
    login,
    logout  
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
      