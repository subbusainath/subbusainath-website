import React, { useEffect } from 'react';
import { useTheme } from '@/components/Hooks/themeHook';
import { useNotification } from '@/contexts/NotificationContext';

const SESSION_STORAGE_KEY_NAV_HELP = 'hasSeenKeyboardNavHelp';

// Define navigation function type
interface HeroProps {
    onNavigateToContact?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToContact }) => {
    const { theme } = useTheme();
    const { showNotification } = useNotification();

    // Navigation function for contact button
    const handleContactClick = () => {
        if (onNavigateToContact) {
            onNavigateToContact();
        } else {
            // Fallback: change hash directly if no prop passed
            window.location.hash = 'contact';
        }
    };

    // Show notification on component mount
    useEffect(() => {
        const currentThemeName = theme.name === 'light' ? 'Light' : 'Dark';
        const targetThemeName = theme.name === 'light' ? 'Dark' : 'Light';
        showNotification({
            message: `Want to switch from ${currentThemeName} to ${targetThemeName} theme? Press Shift+T then T.`,
            type: 'info',
            duration: 7000 // Slightly longer duration for this informative message
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, []); // Empty dependency array ensures this runs only once on mount

    // New effect for one-time welcome/navigation help per session
    useEffect(() => {
        const hasSeenHelp = sessionStorage.getItem(SESSION_STORAGE_KEY_NAV_HELP);

        if (!hasSeenHelp) {
            // Show comprehensive help notification after a short delay to not overlap too much with the theme prompt
            const timer = setTimeout(() => {
                showNotification({
                    message: "Welcome! Use Shift+T+T to toggle theme. Navigate: Home (Shift+H+H), About (Shift+A+A), Contact (Shift+C+C).",
                    type: 'info',
                    duration: 10000 // Longer duration for this important message
                });
                sessionStorage.setItem(SESSION_STORAGE_KEY_NAV_HELP, 'true');
            }, 1500); // Delay this notification slightly

            return () => clearTimeout(timer); // Cleanup timer if component unmounts
        }
    }, [showNotification]);

    return (
        <div className={`min-h-screen flex flex-col ${theme.name === 'light' ? 'bg-white' : 'bg-slate-900'} ${theme.body.text}`}>
            {/* Top Navigation Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 sm:p-6">
                {/* Left Corner - madebysubbu Branding */}
                <div className="group cursor-pointer">
                    <div className={`
                        px-6 py-3 rounded-2xl backdrop-blur-md transition-all duration-300 
                        ${theme.name === 'light'
                            ? 'bg-white/90 hover:bg-white shadow-md hover:shadow-xl border border-slate-300/60'
                            : 'bg-slate-800/90 hover:bg-slate-700/95 shadow-xl hover:shadow-2xl border border-slate-600/60'
                        }
                        hover:scale-110 hover:-translate-y-1
                        relative overflow-hidden
                    `}>
                        {/* Subtle gradient overlay on hover */}
                        <div className={`
                            absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300
                            ${theme.name === 'light'
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                                : 'bg-gradient-to-r from-blue-400 to-purple-400'
                            }
                        `}></div>

                        <div className="relative flex items-center space-x-1">
                            <span className={`
                                text-base font-bold tracking-wide
                                ${theme.name === 'light' ? 'text-slate-800' : 'text-slate-100'}
                                group-hover:${theme.name === 'light' ? 'text-slate-900' : 'text-white'}
                                transition-colors duration-300
                            `}>
                                made
                            </span>
                            <span className={`
                                text-base font-black tracking-wide
                                ${theme.name === 'light' ? 'text-blue-600' : 'text-blue-400'}
                                group-hover:${theme.name === 'light' ? 'text-blue-700' : 'text-blue-300'}
                                transition-colors duration-300
                                relative
                            `}>
                                by
                                {/* Subtle underline accent */}
                                <div className={`
                                    absolute bottom-0 left-0 right-0 h-0.5 
                                    ${theme.name === 'light' ? 'bg-blue-600' : 'bg-blue-400'}
                                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300
                                `}></div>
                            </span>
                            <span className={`
                                text-base font-bold tracking-wide
                                ${theme.name === 'light' ? 'text-slate-800' : 'text-slate-100'}
                                group-hover:${theme.name === 'light' ? 'text-slate-900' : 'text-white'}
                                transition-colors duration-300
                            `}>
                                subbu
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Corner - Profile Picture */}
                <div className="group cursor-pointer">
                    <div className="relative">
                        {/* Animated Ring */}
                        <div className={`
                            absolute inset-0 rounded-full transition-all duration-500
                            ${theme.name === 'light'
                                ? 'bg-gradient-to-r from-blue-400 to-purple-500'
                                : 'bg-gradient-to-r from-blue-500 to-purple-600'
                            }
                            group-hover:scale-110 group-hover:rotate-180
                            animate-pulse group-hover:animate-none
                        `} style={{ padding: '2px' }}>
                            <div className={`
                                w-full h-full rounded-full
                                ${theme.name === 'light' ? 'bg-white' : 'bg-slate-900'}
                            `}></div>
                        </div>

                        {/* Profile Image */}
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14">
                            <img
                                src="/src/assets/profilePic/subbu_pic.jpg"
                                alt="Subbusainath Rengasamy"
                                className="
                                    w-full h-full object-cover rounded-full
                                    transition-all duration-300
                                    group-hover:scale-105 group-hover:brightness-110
                                    shadow-lg group-hover:shadow-xl
                                "
                            />

                            {/* Online Status Indicator */}
                            <div className="absolute -bottom-0.5 -right-0.5">
                                <div className={`
                                    w-4 h-4 rounded-full border-2 
                                    ${theme.name === 'light' ? 'border-white' : 'border-slate-900'}
                                    bg-green-500 shadow-sm
                                    transition-all duration-300 group-hover:scale-110
                                `}>
                                    <div className="w-full h-full rounded-full bg-green-400 animate-ping opacity-75"></div>
                                </div>
                            </div>
                        </div>

                        {/* Hover Tooltip */}
                        <div className={`
                            absolute top-full right-0 mt-2 px-3 py-1.5 rounded-lg
                            opacity-0 group-hover:opacity-100 pointer-events-none
                            transition-all duration-300 transform translate-y-1 group-hover:translate-y-0
                            ${theme.name === 'light'
                                ? 'bg-slate-900 text-white'
                                : 'bg-white text-slate-900'
                            }
                            shadow-lg text-xs font-medium whitespace-nowrap
                        `}>
                            Available for Projects
                            {/* Arrow */}
                            <div className={`
                                absolute bottom-full right-4 border-4 border-transparent
                                ${theme.name === 'light' ? 'border-b-slate-900' : 'border-b-white'}
                            `}></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Content */}
            <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
                <h1 className={`${theme.headings.main} mb-4 sm:mb-6`}>
                    Building the future.
                </h1>
                <p className={`${theme.headings.sub} max-w-2xl mb-8 sm:mb-10`}>
                    Senior engineer. Cloud. Serverless.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <button
                        className={`
              ${theme.buttons.primary.background} 
              ${theme.buttons.primary.text} 
              ${theme.buttons.primary.padding} 
              ${theme.buttons.primary.shape}
              ${theme.buttons.primary.hoverBackground}
              transition-colors duration-300 ease-in-out
              text-lg font-medium
            `}
                    >
                        See my work
                    </button>
                    <button
                        onClick={handleContactClick}
                        className={`
              ${theme.buttons.secondary.background} 
              ${theme.buttons.secondary.text} 
              ${theme.buttons.secondary.padding} 
              ${theme.buttons.secondary.shape}
              ${theme.buttons.secondary.border}
              ${theme.buttons.secondary.hoverBackground}
              transition-colors duration-300 ease-in-out
              text-lg font-medium
            `}
                    >
                        Contact me
                    </button>
                </div>
            </div>

            {/* Optional: Footer or spacer if needed */}
            <div className="p-4 sm:p-6"></div>
        </div>
    );
};

export default Hero;
