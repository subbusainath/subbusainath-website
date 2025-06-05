import React, { createContext, useState, useContext, useCallback, type ReactNode } from 'react';
import NotificationComponent from '../components/Notification'; // Renamed to avoid conflict

// Defines the shape of a single notification
export interface NotificationState {
    id: string; // Unique ID for each notification
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number; // Optional duration in ms, defaults to a standard value
}

// Defines the context value
interface NotificationContextType {
    showNotification: (notification: Omit<NotificationState, 'id'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provides a unique ID for notifications
let notificationIdCounter = 0;

const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [notifications, setNotifications] = useState<NotificationState[]>([]);

    const showNotification = useCallback((notificationDetails: Omit<NotificationState, 'id'>) => {
        const id = `notif-${notificationIdCounter++}`;
        const newNotification: NotificationState = { ...notificationDetails, id };
        setNotifications([newNotification]);
        const duration = notificationDetails.duration || 5000;
        setTimeout(() => {
            setNotifications(currentNotifications =>
                currentNotifications.filter(n => n.id !== id)
            );
        }, duration);
    }, []);

    const closeNotification = useCallback((id: string) => {
        setNotifications(currentNotifications =>
            currentNotifications.filter(n => n.id !== id)
        );
    }, []);

    // Get the first notification if it exists
    const currentNotification = notifications.length > 0 ? notifications[0] : null;

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {/* Render the current notification. */}
            {currentNotification && (
                <NotificationComponent
                    key={currentNotification.id}
                    message={currentNotification.message}
                    type={currentNotification.type}
                    isVisible={true}
                    onClose={() => closeNotification(currentNotification.id)}
                />
            )}
        </NotificationContext.Provider>
    );
};
export default NotificationProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
}; 