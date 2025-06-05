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
        <div className={`min-h-screen flex flex-col ${theme.body.background} ${theme.body.text}`}>
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
