// src/app/router.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout, DashboardLayout } from "@/shared";
// import UserListPage from "../features/users/pages/UserListPage";
import UserListPage  from "../features/users/pages/UserListPage";
import { UserRegisterForm } from "../features/users";


const router = createBrowserRouter ([
    {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
    },
    {
        path: "/auth",
        element: <AuthLayout/>,
        children: [
            {
                index: true,
            },
        ],
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
            { index: true },
            { path: "usersList", element: <UserListPage /> },
            { path: "usersCreate", element: <UserRegisterForm  /> },
            { path: "usersReport", element: <UserRegisterForm  /> },
        ],
    },

]);

export default router;