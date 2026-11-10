import { Outlet } from "react-router-dom";
import authBg from "@/assets/images/bg-1.png";
import { UserRegisterLogin } from "../../features/users";

export default function AuthLayout() {
  return (
    <>
      <div className="min-h-screen grid grid-cols-2">

        <div>
          <img
            src= {authBg}
            alt="Restaurante"
            className="w-full h-screen object-cover"
          />
        </div>

        <div className="bg-[var(--color-primary-50)] flex justify-center items-center">
          <main>

            <UserRegisterLogin />

            <Outlet />

          </main>
        </div>

      </div>
    </>
  );
}