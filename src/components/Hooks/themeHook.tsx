import { useContext, useMemo, useState, useEffect, useCallback, type ReactNode } from 'react';
import {
    // type AppTheme, // Keep AppTheme for type safety if needed elsewhere, or remove if only ThemeContextType is used by consumers - Linter error for AppTheme removed
    lightTheme,
    darkTheme,
    ThemeContext,
    type ThemeContextType
} from '@/styles/themeDefinitions';

// ThemeProvider Component: Wraps the application (or parts of it)
// to provide the theme object down the component tree via context.
interface ThemeProviderProps {
    children: ReactNode; // Allows this component to wrap other components
    // value?: AppTheme; // Optionally allow passing a specific theme object
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    // State to hold the current theme name ('light' or 'dark')
    const [currentThemeName, setCurrentThemeName] = useState<'light' | 'dark'>('light');

    // Effect to load the saved theme from localStorage on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('app-theme-preference') as 'light' | 'dark' | null;
        if (savedTheme) {
            setCurrentThemeName(savedTheme);
        } else {
            // Optional: Check system preference if no theme is saved
            // const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            // setCurrentThemeName(prefersDark ? 'dark' : 'light');
        }
    }, []);

    // Effect to save the theme to localStorage whenever it changes
    // Also, update a class on the <html> element for global styling if needed (e.g., for Tailwind's dark mode variant)
    useEffect(() => {
        localStorage.setItem('app-theme-preference', currentThemeName);
        if (currentThemeName === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [currentThemeName]);

    // Wrap toggleTheme in useCallback
    const toggleTheme = useCallback(() => {
        setCurrentThemeName(prevThemeName => (prevThemeName === 'light' ? 'dark' : 'light'));
    }, []); // No dependencies, so it's created once

    // Determine the current theme object based on the theme name
    const activeTheme = useMemo(() => {
        return currentThemeName === 'light' ? lightTheme : darkTheme;
    }, [currentThemeName]);

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo<ThemeContextType>(() => ({
        theme: activeTheme,
        toggleTheme,
    }), [activeTheme, toggleTheme]); // toggleTheme is stable due to useCallback not being strictly needed here as it only calls setCurrentThemeName

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
};

// useTheme Hook: Consumes the theme from ThemeContext.
// Any component calling this hook will receive the theme object
// provided by the nearest ThemeProvider in the component tree.
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        // This error means useTheme was called outside of a ThemeProvider
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Optional: A ThemeProvider component could be created if you need to
// pass the theme down via context, especially for larger applications
// or if you don't want to call useTheme() in every component.