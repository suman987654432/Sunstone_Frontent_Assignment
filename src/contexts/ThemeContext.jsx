import React, { createContext, useContext, useEffect, useState } from 'react';
const ThemeContext = createContext();
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            let shouldUseDark;
            if (savedTheme) {
                shouldUseDark = savedTheme === 'dark';
            } else {
                shouldUseDark = prefersDark;
            }

            const root = document.documentElement;
            if (shouldUseDark) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }

            setIsDarkMode(shouldUseDark);
            setIsLoading(false);
        };

        initializeTheme();
    }, []);

    useEffect(() => {
        if (isDarkMode === null) return;


        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }


        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    if (isLoading) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
