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

  const login = async (nic, password) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        nic,
        password
      });
      const { user, token} = res.data;

      console.log('Login response from server:',res.data);
      
    if (!user || !user.role) {
      throw new Error('Role not found in response');
    }

     // const user= res;

    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token',token);
    setUser(user);

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
      