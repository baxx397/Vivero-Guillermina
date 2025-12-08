/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  //  Al montar, revisa si hay sesión guardada
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    const users = [
      { email: 'admin@vivero.com', password: '1234', role: 'admin' },
      { email: 'usuario@vivero.com', password: '1234', role: 'Gaston' },
    ];

    const userFound = users.find(u => u.email === email);

    if (!userFound) {
      return { success: false, error: 'Credencial incorrecta (usuario no encontrado)' };
    }

    if (userFound.password !== password) {
      return { success: false, error: 'Contraseña incorrecta' };
    }

    // ✅ Guarda usuario en memoria y en localStorage
    setIsAuthenticated(true);
    setUser(userFound);
    localStorage.setItem('user', JSON.stringify(userFound));

    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user'); // 🔒 Limpia la sesión
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
