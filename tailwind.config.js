/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                'inter': ['Inter', 'sans-serif'],
            },
            colors: {
                // More vibrant gradient colors for higher density
                'glow-start-light': '#4F46E5', // indigo-600
                'glow-mid-light': '#0EA5E9',   // sky-500
                'glow-end-light': '#EC4899',   // pink-500
                // Significantly brighter colors for dark theme gradient for maximum visibility
                'glow-start-dark': '#C7D2FE',  // indigo-200 (was indigo-300 #A5B4FC)
                'glow-mid-dark': '#E0F2FE',    // sky-100   (was sky-200 #BAE6FD)
                'glow-end-dark': '#FCE7F3',    // pink-100  (was pink-300 #F9A8D4)
            },
            animation: {
                // Keep shimmer for other potential uses or remove if not needed
                'border-glow-shimmer': 'borderGlowShimmer 4s ease-in-out infinite',
                'border-rotate': 'borderRotate 4s linear infinite', // New rotation animation
            },
            keyframes: {
                borderGlowShimmer: {
                    '0%, 100%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                },
                borderRotate: { // New keyframes for rotation
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            },
        },
    },
    plugins: [
        function ({ addUtilities, theme, e }) {
            const scrollbarThumbColor = theme('colors.gray.400', '#a0aec0');
            const scrollbarThumbColorHover = theme('colors.gray.500', '#718096');

            const newUtilities = {
                '.custom-global-scrollbar': {
                    'overflow': 'auto',
                    /* For Webkit browsers */
                    '&::-webkit-scrollbar': {
                        'width': '10px',
                        'height': '10px',
                    },
                    '&::-webkit-scrollbar-track': {
                        'background': 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        'background-color': 'transparent',
                        'border-radius': '5px',
                        'border': '2px solid transparent',
                        'background-clip': 'content-box',
                    },
                },
                /* Show scrollbar thumb when body.is-scrolling */
                'body.is-scrolling .custom-global-scrollbar::-webkit-scrollbar-thumb': {
                    'background-color': scrollbarThumbColor,
                },
                /* Optional: Darken thumb slightly if user hovers directly over the visible scrollbar */
                'body.is-scrolling .custom-global-scrollbar::-webkit-scrollbar-thumb:hover': {
                    'background-color': scrollbarThumbColorHover,
                },
                /* For Firefox */
                '.custom-global-scrollbar': {
                    'scrollbar-width': 'thin',
                    'scrollbar-color': 'transparent transparent',
                },
                'body.is-scrolling .custom-global-scrollbar': {
                    'scrollbar-color': `${scrollbarThumbColor} transparent`,
                },
                /* Optional: Darken thumb slightly if user hovers directly over the visible scrollbar - Firefox version */
                'body.is-scrolling .custom-global-scrollbar:hover': {
                    'scrollbar-color': `${scrollbarThumbColorHover} transparent`,
                }
            };
            addUtilities(newUtilities, ['responsive']);
        },
        function ({ addUtilities, theme }) {
            const newUtilities = {
                '.animated-gradient-border-container': {
                    position: 'relative',
                    padding: '2px',
                    overflow: 'hidden',
                    borderRadius: theme('borderRadius.2xl'),
                },
                '.animated-gradient-border-container::before': {
                    content: '""',
                    position: 'absolute',
                    left: '-100%',
                    top: '-100%',
                    width: '300%',
                    height: '300%',
                    zIndex: '0',
                    backgroundSize: '100%',
                    opacity: '0',
                    transition: 'opacity 0.3s ease-in-out',
                },
                '.animated-gradient-border-container:hover::before': {
                    opacity: '1',
                    animation: theme('animation.border-rotate'),
                },
                '.gradient-border-light::before': {
                    backgroundImage: `conic-gradient(from 0deg, ${theme('colors.glow-start-light')}, ${theme('colors.glow-mid-light')}, ${theme('colors.glow-end-light')}, ${theme('colors.glow-start-light')})`,
                },
                '.gradient-border-dark::before': {
                    backgroundImage: `conic-gradient(from 0deg, ${theme('colors.glow-start-dark')}, ${theme('colors.glow-mid-dark')}, ${theme('colors.glow-end-dark')}, ${theme('colors.glow-start-dark')})`,
                },
                '.card-content-inner': {
                    position: 'relative',
                    zIndex: '1',
                    width: '100%',
                    height: '100%',
                    borderRadius: 'inherit',
                }
            };
            addUtilities(newUtilities, ['responsive', 'hover']);
        }
    ],
}