import React from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

interface NotificationProps {
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    onClose: () => void;
    isVisible: boolean; // Controls visibility
}

const iconMap = {
    success: <CheckCircle className="text-green-500" size={24} />,
    error: <XCircle className="text-red-500" size={24} />,
    warning: <AlertTriangle className="text-yellow-500" size={24} />,
    info: <Info className="text-blue-500" size={24} />,
};

const bgColorMap = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
};

const Notification: React.FC<NotificationProps> = ({ message, type, onClose, isVisible }) => {
    if (!isVisible) {
        return null;
    }

    return (
        <div
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            className={`
        fixed top-5 right-5 z-50 p-4 rounded-md shadow-lg border
        flex items-start max-w-sm
        transition-all duration-300 ease-in-out
        ${bgColorMap[type]}
        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
      `}
        >
            <div className="mr-3 flex-shrink-0">
                {iconMap[type]}
            </div>
            <div className="flex-grow mr-4">
                <p className="text-sm font-medium">{message}</p>
            </div>
            <button
                onClick={onClose}
                aria-label="Close notification"
                className={`
          ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8
          focus:outline-none focus:ring-2
          hover:bg-opacity-20
          ${type === 'success' ? 'hover:bg-green-200 focus:ring-green-400' : ''}
          ${type === 'error' ? 'hover:bg-red-200 focus:ring-red-400' : ''}
          ${type === 'warning' ? 'hover:bg-yellow-200 focus:ring-yellow-400' : ''}
          ${type === 'info' ? 'hover:bg-blue-200 focus:ring-blue-400' : ''}
        `}
            >
                <X size={20} />
            </button>
        </div>
    );
};

export default Notification; 