import { Button } from "@/shared";
import { DetailItem } from "@/shared";
import Dilan from "@/assets/images/users/dilan.png";
import { useNavigate } from "react-router-dom";

export default function ReadUser() {
    const user = {
    userName: "Dilan Estiven Gómez",
    userImage: Dilan,
    documentType: "Cédula de extranjería",
    documentNumber: "523412",
    userType: "Empleado",
    userEmail: "dilan.gomez@example.com",
    institutionalEmail: "dilan.gomez@sena.edu.co",
    userPhone: "3154567890",
    secondPhone: "3159876543",
    address: "Dosquebradas, Risaralda",
    startDate: "10/02/2026",
    endDate: "Sin definir",
    status: "Activo",
};

const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-sans">

      <div className="flex-1 p-6 flex justify-center items-center">

        <div className="w-full max-w-6xl bg-gradient-to-b from-form-from to-form-to rounded-3xl shadow-lg p-8 relative">

          <Button
            variant="back"
            size="back"
            type="button"
            onClick={() => navigate("/dashboard/userList")}
          >
            ← Atrás
          </Button>

          <div className="flex items-center gap-3 mb-8 mt-8 border-b border-accent pb-3">

            <div className="text-4xl">
              👤
            </div>

            <h2 className="text-2xl font-bold uppercase text-accent">
              Perfil de Usuario
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-10">

            <div className="flex flex-col items-center">

              <div className="w-64 h-72 rounded-xl overflow-hidden border-4 border-panel shadow-md">

                <img
                  src={user.userImage}
                  alt={user.userName}
                  className="w-full h-full object-cover"
                />

              </div>

              <h3 className="mt-5 text-xl font-bold text-text-primary">
                {user.userName}
              </h3>

              <div className="w-full border-b border-accent my-5" />

              <div className="flex items-center gap-3">

                <span className="font-semibold">
                  Estado
                </span>

                <span className="bg-accent text-on-accent px-4 py-1 rounded-full text-sm font-semibold">
                  {user.status}
                </span>

              </div>

              <div className="flex justify-center mt-8">

                <Button
                  variant="finish"
                  size="finish"
                  type="button"
                  onClick={() => navigate("/UpdateUser")}
                >
                  ✏ Editar
                </Button>

              </div>

            </div>

            <div className="bg-panel rounded-2xl shadow-md p-8">

              <DetailItem
                label="Tipo de documento"
                value={user.documentType}
              />

              <DetailItem
                label="Número de documento"
                value={user.documentNumber}
              />

              <DetailItem
                label="Tipo de usuario"
                value={user.userType}
              />

              <DetailItem
                label="Correo electrónico"
                value={user.userEmail}
              />

              <DetailItem
                label="Correo institucional"
                value={user.institutionalEmail}
              />

              <DetailItem
                label="Número telefónico"
                value={user.userPhone}
              />

              <DetailItem
                label="Segundo teléfono"
                value={user.secondPhone}
              />

              <DetailItem
                label="Dirección"
                value={user.address}
              />

              <DetailItem
                label="Fecha inicio"
                value={user.startDate}
              />

              <DetailItem
                label="Fecha fin"
                value={user.endDate}
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

