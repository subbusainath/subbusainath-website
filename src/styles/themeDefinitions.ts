// src/styles/themeDefinitions.ts
import { createContext } from 'react';

// Defines the structure for a theme in the application.
export interface AppTheme {
    name: 'light' | 'dark'; // To identify the theme
    body: {
        background: string; // Tailwind class for body background color
        text: string;       // Tailwind class for default body text color
    };
    headings: {
        main: string;       // Tailwind classes for the main heading (e.g., "Building the future.")
        sub: string;        // Tailwind classes for the subheading (e.g., "Senior engineer...")
    };
    buttons: {
        primary: {
            background: string;
            text: string;
            hoverOpacity?: string;
            shape: string;
            padding: string;
            border?: string; // Optional border
            hoverBackground?: string;
        };
        secondary: {
            background: string;
            text: string;
            hoverBackground?: string;
            shape: string;
            padding: string;
            border?: string; // Optional border
        };
        // For the theme toggle button
        themeToggle: {
            iconColor: string; // Color for the sun/moon icon
            background: string;
            hoverBackground: string;
            shape: string;
            padding: string;
            shadow?: string;
            hoverTransform?: string;
        };
    };
}

// Light Theme: Gradient Sky (based on the new image)
export const lightTheme: AppTheme = {
    name: 'light',
    body: {
        background: 'bg-gradient-to-br from-sky-100 via-sky-50 to-white',
        text: 'text-slate-700 font-inter',
    },
    headings: {
        main: 'text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent',
        sub: 'text-3xl sm:text-4xl text-slate-500 font-inter',
    },
    buttons: {
        primary: {
            background: 'bg-gradient-to-r from-cyan-500 to-teal-500',
            text: 'text-white font-inter',
            hoverOpacity: 'hover:opacity-100',
            shape: 'rounded-full',
            padding: 'px-8 py-3 sm:px-10 sm:py-4',
            hoverBackground: 'hover:bg-gradient-to-r from-cyan-300 to-teal-300',
        },
        secondary: {
            background: 'bg-slate-50',
            text: 'text-slate-700 font-inter',
            hoverBackground: 'hover:bg-slate-100',
            shape: 'rounded-full',
            padding: 'px-8 py-3 sm:px-10 sm:py-4',
            border: 'border border-slate-300',
        },
        themeToggle: {
            iconColor: 'text-slate-600',
            background: 'bg-white',
            hoverBackground: 'hover:bg-slate-100',
            shape: 'rounded-full',
            padding: 'p-3',
            shadow: 'shadow-md',
            hoverTransform: 'hover:scale-110',
        }
    },
};

// Dark Theme: Gradient Sky (Dark Version - complementary)
export const darkTheme: AppTheme = {
    name: 'dark',
    body: {
        background: 'bg-gradient-to-br from-slate-900 via-sky-900 to-slate-800',
        text: 'text-slate-200 font-inter',
    },
    headings: {
        main: 'text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent',
        sub: 'text-3xl sm:text-4xl text-slate-400 font-inter',
    },
    buttons: {
        primary: {
            background: 'bg-gradient-to-r from-cyan-500 to-teal-500',
            text: 'text-white font-inter',
            hoverOpacity: 'hover:opacity-90',
            shape: 'rounded-full',
            padding: 'px-8 py-3 sm:px-10 sm:py-4',
            hoverBackground: 'hover:bg-gradient-to-r from-cyan-400 to-teal-400',
        },
        secondary: {
            background: 'bg-slate-700',
            text: 'text-slate-100 font-inter',
            hoverBackground: 'hover:bg-slate-600',
            shape: 'rounded-full',
            padding: 'px-8 py-3 sm:px-10 sm:py-4',
            border: 'border border-slate-600',
        },
        themeToggle: {
            iconColor: 'text-slate-200',
            background: 'bg-slate-700',
            hoverBackground: 'hover:bg-slate-600',
            shape: 'rounded-full',
            padding: 'p-3',
            shadow: 'shadow-lg',
            hoverTransform: 'hover:scale-110',
        }
    },
};

// Define the type for our Theme Context value
export interface ThemeContextType {
    theme: AppTheme;
    toggleTheme: () => void;
}

// Create and export the ThemeContext.
// The actual initial theme and toggle function will be set by the ThemeProvider.
export const ThemeContext = createContext<ThemeContextType>({
    theme: lightTheme, // Default to light theme initially
    toggleTheme: () => {
        // This is a placeholder and should be overridden by ThemeProvider
        console.warn("toggleTheme function called outside of a ThemeProvider.");
    },
}); 