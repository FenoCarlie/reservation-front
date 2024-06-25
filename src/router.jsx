import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import AdminLayout from "./layouts/AdminLayout";
import NotFundPage from "./pages/NotFundPage";
import LoginLayout from "./layouts/LoginLayout";
import Login from "./pages/LoginLayout/Login";
import DashBoard from "./pages/adminLayout/DashBoard";

// Defining routes with their respective layouts
const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />, // Default layout
  },
  {
    path: "/admin",
    element: <AdminLayout />, // Layout for admins
    children: [
      {
        path: "/admin/",
        element: <Navigate to="/admin/dashBoard" />,
      },
      {
        path: "/admin/dashBoard",
        element: <DashBoard />,
      },
    ],
  },
  {
    path: "/auth",
    element: <LoginLayout />, // Layout for login
    children: [
      {
        path: "/auth",
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFundPage />, // Page for undefined routes
  },
]);

export default router;
