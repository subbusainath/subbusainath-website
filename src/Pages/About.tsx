import React from 'react';
import { useTheme } from '@/components/Hooks/themeHook';

const About: React.FC = () => {
    const { theme } = useTheme();

    // Determine placeholder styles based on theme, with fallbacks
    const placeholderBg = theme.name === 'light' ? 'bg-slate-200' : 'bg-slate-700';
    const placeholderText = theme.name === 'light' ? 'text-slate-500' : 'text-slate-400';
    // Determine secondary text color, could be less prominent than primary body text
    const secondaryTextColor = theme.name === 'light' ? 'text-slate-600' : 'text-slate-300';

    return (
        <div
            className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 ${theme.body.background} ${theme.body.text} transition-colors duration-300`}
        >
            <div className="container mx-auto max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
                    {/* Column 1: Image Placeholder */}
                    <div className="md:col-span-1 flex justify-center items-center">
                        <div
                            className={`w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full ${placeholderBg} flex items-center justify-center shadow-xl transition-colors duration-300`}
                        >
                            <span className={`${placeholderText} text-lg font-medium transition-colors duration-300`}>
                                Your Image
                            </span>
                        </div>
                    </div>

                    {/* Column 2: Details */}
                    <div className="md:col-span-2 text-center md:text-left">
                        <h1
                            className={`text-4xl sm:text-5xl font-bold ${theme.headings.main} mb-6 md:mb-8 transition-colors duration-300`}
                        >
                            Your Name {/* Replace with your actual name */}
                        </h1>
                        <p
                            className={`text-base sm:text-lg leading-relaxed ${secondaryTextColor} mb-4 transition-colors duration-300`}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p
                            className={`text-base sm:text-lg leading-relaxed ${secondaryTextColor} transition-colors duration-300`}
                        >
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        {/* You can add more paragraphs or other elements here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;