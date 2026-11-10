
import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout, DashboardLayout, ProtectedRoute } from "@/shared";

import CreateUser from "@/features/create/CreateUser";
import CreateUserLogin from "@/features/create/CreateUserLogin";
import CreateSupplier from "@/features/create/CreateSupplier";
import CreateInventory from "@/features/create/CreateInventory";
import CreateProduct from "@/features/create/CreateProduct";
import CreateOrder from "@/features/create/CreateOrder";

import { UserRegisterForm } from "../features/users";
import { UserListPage } from "@/features/users";
import { InventoryListPage } from "@/features/inventory";
import { HomePage } from "@/features/home";
import { SupplierListPage } from "@/features/suppliers";
import { ProductListPage } from "../features/products";
import { OrderListPage } from "../features/order";

import RecoverPassword from "@/features/password/pages/RecoverPassword";
import VerifyCode from "@/features/password/pages/VerifyCode";
import ResetPassword from "@/features/password/pages/ResetPassword";

import ReadUser from "../features/users/pages/ReadUser"
import ReadSupplier from "../features/suppliers/pages/ReadSupplier";
import ReadOrder  from "../features/order/pages/ReadOrder";
import ReadProduct from "../features/products/pages/ReadProduct";
import ReadInventory from "../features/inventory/pages/ReadInventory";

import UpdateUser from "@/features/update/users/UpdateUser";
import UpdateSupplier from "@/features/update/suppliers/UpdateSupplier";
import UpdateInventory from "@/features/update/inventory/UpdateInventory";
import UpdateProduct from "@/features/update/products/UpdateProduct";
import UpdateOrder from "@/features/update/order/UpdateOrder";

import { PermissionManagement } from "../features/permissions";
import { AccessPage } from "@/features/access";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth" replace />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
      },
    ],
  },
  {
    path: "/recover-password",
    element: <RecoverPassword />,
  },
  {
    path: "/verify-code",
    element: <VerifyCode />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/CreateUserLogin",
    element: <CreateUserLogin />,
    children: [
      {
        index: true,
      },
    ],
  },

  {
    path: "/HomePage",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/access",
    element: (
      <ProtectedRoute>
        <AccessPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true },
      { path: "userList", element: <UserListPage /> },
      { path: "userCreate", element: <UserRegisterForm /> },
      { path: "inventoryList", element: <InventoryListPage /> },
      { path: "supplierList", element: <SupplierListPage /> },
      { path: "productList", element: <ProductListPage /> },
      { path: "orderList", element: <OrderListPage /> },
      { path: "homePage", element: <HomePage /> },
      { path: "/dashboard/userRead/:id", element: <ReadUser/> },
      { path: "/dashboard/supplierRead/:id", element: <ReadSupplier />,},
      { path: "/dashboard/orderRead/:id", element: <ReadOrder /> },
      { path: "/dashboard/productRead/:id", element: <ReadProduct /> },
      { path: "/dashboard/inventoryRead/:id", element: <ReadInventory /> },
      { path: "UpdateUser", element: <UpdateUser /> },
      
    ],
  },

  {
    path: "/CreateUser",
    element: (
      <ProtectedRoute>
        <CreateUser />
      </ProtectedRoute>
    ),
  },
  {
    path: "/CreateSupplier",
    element: (
      <ProtectedRoute>
        <CreateSupplier />
      </ProtectedRoute>
    ),
  },
  {
    path: "/CreateInventory",
    element: (
      <ProtectedRoute>
        <CreateInventory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/CreateProduct",
    element: (
      <ProtectedRoute>
        <CreateProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "/CreateOrder",
    element: (
      <ProtectedRoute>
        <CreateOrder />
      </ProtectedRoute>
    ),
  },
  {
  path: "/UpdateUser/:id",
  element: (
      <ProtectedRoute>
        <UpdateUser />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Permissions",
    element: (
      <ProtectedRoute>
        <PermissionManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/UpdateSupplier/:id",
    element: (
      <ProtectedRoute>
        <UpdateSupplier />
      </ProtectedRoute>
    ),
  },
  {
  path: "/UpdateInventory/:id",
  element: (
    <ProtectedRoute>
      <UpdateInventory />
    </ProtectedRoute>
  ),
  },
  {
  path: "/UpdateProduct/:id",
  element: (
    <ProtectedRoute>
      <UpdateProduct />
    </ProtectedRoute>
  ),
  },
  {
  path: "/UpdateOrder/:id",
  element: (
    <ProtectedRoute>
      <UpdateOrder />
    </ProtectedRoute>
  ),
  },
]);

export default router;
