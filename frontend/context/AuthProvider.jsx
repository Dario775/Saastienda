import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Intentar cargar token de localStorage al iniciar
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
            // Aquí se podría hacer una llamada a /api/v1/auth/me para obtener datos del usuario
            // Por ahora simulamos un usuario
            setUser({ email: 'usuario@ejemplo.com' });
        }
        setIsLoading(false);
    }, []);

    const login = (newToken, userData) => {
        setToken(newToken);
        setUser(userData);
        localStorage.setItem('authToken', newToken);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
