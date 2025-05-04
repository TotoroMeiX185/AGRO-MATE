import axios from 'axios';
//import jwtDecode from 'jwt-decode';
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
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        NIC,
        password
      });
      const { token} = res.data;
      const {role} = res.data.user;

    const data =res.data;
    console.log('Login response from server:', data);

    if (!res.data.user || !res.data.user.role) {
      throw new Error('Role not found in response');
    }


  const user= res.data.user;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(data.user);

    return user;

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
      