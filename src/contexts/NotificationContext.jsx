import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

// Create a context for notifications
const NotificationContext = createContext();

// Notification provider component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const timeoutsRef = useRef({});

  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      Object.values(timeoutsRef.current).forEach(clearTimeout);
    };
  }, []);

  const addNotification = (message, type = "info", timeout = 6000) => {
    const id = Date.now();
    const newNotification = {
      id,
      message,
      type,
      startTime: Date.now(),
      remainingTime: timeout,
      paused: false,
    };
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);

    timeoutsRef.current[id] = setTimeout(() => {
      removeNotification(id);
    }, timeout);
    return newNotification.id;
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif.id !== id)
    );
    clearTimeout(timeoutsRef.current[id]);
    delete timeoutsRef.current[id];
  };

  const pauseNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id
          ? {
              ...notif,
              paused: true,
              remainingTime:
                notif.remainingTime - (Date.now() - notif.startTime),
            }
          : notif
      )
    );
    clearTimeout(timeoutsRef.current[id]);
  };

  const resumeNotification = (id) => {
    const notification = notifications.find((notif) => notif.id === id);
    if (notification) {
      notification.startTime = Date.now();
      timeoutsRef.current[id] = setTimeout(() => {
        removeNotification(id);
      }, notification.remainingTime);
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif.id === id ? { ...notif, paused: false } : notif
        )
      );
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        pauseNotification,
        resumeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotificationContext = () => useContext(NotificationContext);
