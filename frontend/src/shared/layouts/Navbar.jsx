import { useState } from "react";
import {
  Menu,
  House,
  Users,
  KeyRound,
  Utensils,
  GraduationCap,
  Image,
  Package,
  Boxes,
  Truck,
  ClipboardList,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import {
  IconButton,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  SearchField,
} from "@/shared";
import logo from "@/assets/images/1-logo.png";
import { Link } from "react-router-dom";
import { showOpsAlert } from "@/shared/services/alertService";

import { Sun, Moon } from "lucide-react";
import useTheme from "@/shared/context/useTheme";

import { useNavigate } from "react-router-dom";
import { logout } from "@/features/auth/services/logoutService";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();

  const handleLogout = () => {
  logout();
  navigate("/auth", { replace: true });
  };

  const handleSearch = (value) => {
    console.log("Buscar:", value);
  };

  const handleClear = () => {
    console.log("Campo limpiado");
  };

  return (
    <nav
  className={`w-full border-b-2 ${
    theme === "dark"
      ? "bg-black border-gray-800 text-white"
      : "bg-white/70 backdrop-blur-sm"
  }`}
>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">

          {/* Logo de marca */}
          <div className="hidden sm:block items-center">
            <Link to={"/HomePage"} className="text-h1 font-heading">
              <img src={logo} alt="logo" className="h-12" />
            </Link>
          </div>

          {/* Links de navegación */}
          <ul className="hidden md:flex items-center gap-6">

            <li>
              <Link
                to={"/HomePage"}
                className="hover:text-primary transition flex items-center gap-1.5"
              >
                <House size={17} />
                Inicio
              </Link>
            </li>

            <li>
              <Link
                to={"/dashboard/userList"}
                className="hover:text-primary transition flex items-center gap-1.5"
              >
                <Users size={17} />
                Usuarios
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard/access"
                className="hover:text-primary transition flex items-center gap-1.5"
              >
                <KeyRound size={17} />
                Permisos
              </Link>
            </li>

            <li>
              <Link
                to={"/dashboard/readMenu"}
                className="hover:text-primary transition flex items-center gap-1.5"
              >
                <Utensils size={17} />
                Menu
              </Link>
            </li>

            <li
              onClick={() =>
                showOpsAlert({
                  title: "Ops, hubo un error",
                  text: "Esta opción no está disponible en este momento.",
                })
              }
              className="cursor-pointer flex items-center gap-1.5"
            >
              <GraduationCap size={17} />
              Cursos
            </li>

            <li
              onClick={() =>
                showOpsAlert({
                  title: "Ops, hubo un error",
                  text: "Esta opción no está disponible en este momento.",
                })
              }
              className="cursor-pointer flex items-center gap-1.5"
            >
              <Image size={17} />
              Multimedia
            </li>

          </ul>

          {/* SearchField */}
          <div>
            <SearchField
              value={search}
              onChange={setSearch}
              onSubmit={handleSearch}
              onClear={handleClear}
              placeholder="Buscar productos..."
              size="md"
              variant="outlined"
              className="w-76"
            />
          </div>

          {/* Dropdown */}
          <Dropdown className="z-50">
            <DropdownTrigger>
              <IconButton ariaLabel="Menú de usuario">
                <Menu />
              </IconButton>
            </DropdownTrigger>

            {/* Contenido */}
            <DropdownContent>

              <DropdownItem>
                <Link
                  to="/dashboard/userList"
                  className="flex items-center gap-2 w-full"
                >
                  <Users size={17} />
                  Usuarios
                </Link>
              </DropdownItem>

              <DropdownItem>
                <Link
                  to="/dashboard/productList"
                  className="flex items-center gap-2 w-full"
                >
                  <Package size={17} />
                  Productos
                </Link>
              </DropdownItem>

              <DropdownItem>
                <Link
                  to="inventoryList"
                  className="flex items-center gap-2 w-full"
                >
                  <Boxes size={17} />
                  Inventario
                </Link>
              </DropdownItem>

              <DropdownItem>
                <Link
                  to="supplierList"
                  className="flex items-center gap-2 w-full"
                >
                  <Truck size={17} />
                  Proveedores
                </Link>
              </DropdownItem>

              <DropdownItem>
                <Link
                  to="orderList"
                  className="flex items-center gap-2 w-full"
                >
                  <ClipboardList size={17} />
                  Ordenes
                </Link>
              </DropdownItem>

              <DropdownItem>
                    <Link to="/dashboard/access" className="flex items-center gap-2 w-full">
                    <ShieldCheck size={17} />
                      Gestión permisos
                    </Link>
               </DropdownItem>

              <DropdownItem>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex items-center gap-2 w-full text-left"
                >
                  {theme === "light" ? (
                    <>
                      <Moon size={17} />
                      Modo oscuro
                    </>
                  ) : (
                    <>
                      <Sun size={17} />
                      Modo claro
                    </>
                  )}
                </button>
              </DropdownItem>

              <DropdownItem>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full text-left"
                >
                  <LogOut size={17} />
                  Cerrar sesión
                </button>
              </DropdownItem>

            </DropdownContent>
          </Dropdown>

        </div>
      </div>
    </nav>
  );
}