import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Sayfa yüklendiğinde localStorage'dan token ve admin durumu kontrolü
    const token = localStorage.getItem('token');
    const adminStatus = localStorage.getItem('isAdmin');
    
    if (token) {
      setIsAuthenticated(true);
    }
    
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = (token, isAdminUser = false) => {
    localStorage.setItem('token', token);
    if (isAdminUser) {
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
    }
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 