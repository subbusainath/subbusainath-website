import React, { useEffect } from 'react';
import { X, Keyboard, Lightbulb, Home, UserCircle, Briefcase, Mail, Clock } from 'lucide-react'; // UserCircle for About, Mail for Contact, Clock for Timeline
import { useTheme } from './Hooks/themeHook'; // To style modal according to theme

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const shortcuts = [
    { icon: Lightbulb, keys: 'Shift + T + T', action: 'Toggle Theme (Light/Dark)' },
    { icon: Home, keys: 'Shift + H + H', action: 'Navigate to Home Page' },
    { icon: UserCircle, keys: 'Shift + A + A', action: 'Navigate to About Page' },
    { icon: Briefcase, keys: 'Shift + E + E', action: 'Navigate to Expertise Page' },
    { icon: Clock, keys: 'Shift + L + L', action: 'Navigate to Timeline Page' },
    { icon: Mail, keys: 'Shift + C + C', action: 'Navigate to Contact Page' },
    { icon: Keyboard, keys: 'Esc', action: 'Close this help dialog' },
];

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
    const { theme } = useTheme();

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
        } else {
            document.removeEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    const modalBgColor = theme.name === 'light' ? 'bg-slate-50' : 'bg-slate-800';
    const textColor = theme.name === 'light' ? 'text-slate-700' : 'text-slate-200';
    const itemBgHover = theme.name === 'light' ? 'hover:bg-slate-200' : 'hover:bg-slate-700';
    const borderColor = theme.name === 'light' ? 'border-slate-300' : 'border-slate-600';
    const headerTextColor = theme.name === 'light' ? 'text-slate-900' : 'text-slate-100';
    const keyBgColor = theme.name === 'light' ? 'bg-slate-200' : 'bg-slate-600';
    const keyTextColor = theme.name === 'light' ? 'text-slate-700' : 'text-slate-200';

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300 ease-in-out"
            onClick={onClose} // Close on overlay click
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-modal-title"
        >
            <div
                className={`relative ${modalBgColor} ${textColor} w-full max-w-lg rounded-xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300 ease-in-out scale-100 flex flex-col`}
                onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal content
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 id="help-modal-title" className={`text-2xl font-semibold flex items-center ${theme.headings.main} ${headerTextColor}`}>
                        <Keyboard size={28} className="mr-3 text-indigo-500" />
                        Keyboard Shortcuts
                    </h2>
                    <button
                        onClick={onClose}
                        className={`p-1.5 rounded-full ${itemBgHover} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        aria-label="Close help dialog"
                    >
                        <X size={24} />
                    </button>
                </div>

                <ul className="space-y-3 overflow-y-auto max-h-[60vh]">
                    {shortcuts.map((shortcut, index) => (
                        <li
                            key={index}
                            className={`flex items-center justify-between p-3 rounded-lg border ${borderColor} ${itemBgHover} transition-colors duration-150`}
                        >
                            <div className="flex items-center">
                                <shortcut.icon size={20} className="mr-3 text-indigo-400" />
                                <span className="font-medium">{shortcut.action}</span>
                            </div>
                            <kbd
                                className={`px-2.5 py-1.5 text-xs font-semibold ${keyBgColor} ${keyTextColor} border rounded-md shadow-sm`}
                            >
                                {shortcut.keys}
                            </kbd>
                        </li>
                    ))}
                </ul>

                <p className={`mt-6 text-xs text-center ${textColor} opacity-75`}>
                    Press <kbd className={`px-1.5 py-0.5 text-xs font-semibold ${keyBgColor} ${keyTextColor} border rounded-md`}>Esc</kbd> to close this dialog.
                </p>
            </div>
        </div>
    );
};

export default HelpModal; 