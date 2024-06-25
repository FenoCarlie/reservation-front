import { Outlet } from "react-router-dom";
import { useNotificationContext } from "../contexts/NotificationContext";
import Notification from "../components/common/Notification";

function LoginLayout() {
  const { notifications } = useNotificationContext();
  return (
    <div
      id="LoginLayout"
      className="w-full h-screen flex items-center justify-center "
    >
      <Outlet />
      <div className="fixed z-20 h-auto w-auto top-20 right-0 px-5">
        {notifications.map((notification) => (
          <Notification key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}

export default LoginLayout;
