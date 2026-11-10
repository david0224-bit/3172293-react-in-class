import { useState, useEffect } from "react";
import { Input, Select, Checkbox, Button, FileInput } from "@/shared";
import { getDocumentTypes } from "@/services/selectService";
import { userSchema } from "../users/schemas/userSchema";
import { createUser } from "@/features/users/services/userServices";
import { useNavigate } from "react-router-dom";
import backgroundImage from "@/assets/images/restaurant.jpg";
import {
  showSuccessAlert,
  showUserErrorAlert,
} from "@/shared/services/alertService";

export default function UserRegisterForm() {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    confirmEmail: "",
    userPhone: "",
    userAddress: "",
    userDocumentTypes: "",
    userDocumentNumber: "",
    userPassword: "",
    userImage: [],
    isStaff: false,
    isActive: true,
    isSuperUser: false,
  });

  const [files, setFiles] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getDocumentTypes().then(setDocumentTypes);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleFileChange = (newFiles) => {
    setFiles(newFiles);

    setFormData((prev) => ({
      ...prev,
      userImage: newFiles,
    }));

    setErrors((prev) => ({
      ...prev,
      userImage: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = userSchema.safeParse({
      ...formData,
      userImage: files,
    });

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });

      setErrors(fieldErrors);

      await showUserErrorAlert({
        title: "Error al crear usuario",
        text: "Hay campos vacíos o datos incorrectos. Por favor, verifica la información ingresada.",
      });

      return;
    }

    setErrors({});

    try {
      const userData = {
        ...result.data,
        userImage: files[0] || null,
      };

      await createUser(userData);

      await showSuccessAlert({
        title: "Usuario creado correctamente",
        text: "El usuario se registró correctamente.",
        confirmButtonText: "Aceptar",
        timer: 3000,
      });

      navigate("/auth");
    } catch (error) {
      console.error("Error al crear usuario:", error);

      await showUserErrorAlert({
        title: "Error al crear usuario",
        text: error.message || "No fue posible registrar el usuario.",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="w-full max-w-6xl bg-gradient-to-b from-[var(--color-primary-800)] to-[var(--color-primary-200)] rounded-3xl p-8 shadow-md relative">
          <Button
            variant="back"
            size="back"
            type="button"
            onClick={() => navigate("/auth")}
          >
            <span>←</span> Atrás
          </Button>

          <div className="flex items-center gap-2 mt-8 mb-6 border-b border-[var(--color-primary-950)]/30 pb-3">
            <div className="text-2xl text-[var(--color-primary-950)]">
              👤
              <span className="font-bold text-xl relative -top-2 -left-1">
                +
              </span>
            </div>

            <h2 className="text-[var(--color-primary-950)] font-bold text-xl uppercase tracking-wider">
              Registrar usuario
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
              <div className="space-y-4">
                <Input
                  label="Nombre completo"
                  name="userName"
                  type="text"
                  value={formData.userName}
                  placeholder="Nombre completo"
                  htmlFor="user-name"
                  onChange={handleChange}
                  error={errors.userName}
                />

                <Select
                  label="Tipo de documento"
                  name="userDocumentTypes"
                  value={formData.userDocumentTypes}
                  htmlFor="userDocumentTypes"
                  onChange={handleChange}
                  options={documentTypes}
                  error={errors.userDocumentTypes}
                />

                <Input
                  label="Número de documento"
                  name="userDocumentNumber"
                  type="text"
                  value={formData.userDocumentNumber}
                  placeholder="Número de documento"
                  htmlFor="user-document-number"
                  onChange={handleChange}
                  error={errors.userDocumentNumber}
                />
              </div>

              <div className="space-y-5 flex flex-col items-center">
                <div className="w-full flex justify-center">
                  <FileInput
                    value={files}
                    onChange={handleFileChange}
                    multiple={false}
                    accept="image/*"
                  />
                </div>

                <Input
                  label="Dirección"
                  name="userAddress"
                  type="text"
                  value={formData.userAddress}
                  placeholder="Dirección"
                  htmlFor="user-address"
                  onChange={handleChange}
                  error={errors.userAddress}
                />

                <div className="relative">
                  <Input
                    label="Número telefónico"
                    name="userPhone"
                    type="tel"
                    value={formData.userPhone}
                    placeholder="Número telefónico"
                    htmlFor="user-phone"
                    onChange={handleChange}
                    error={errors.userPhone}
                  />

                  <button
                    type="button"
                    className="absolute right-0 -bottom-6 text-xs text-gray-700 flex items-center gap-1 hover:underline"
                  >
                    <span>+</span>
                    Agregar teléfono
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                <Input
                  label="Correo electrónico"
                  name="userEmail"
                  type="email"
                  value={formData.userEmail}
                  placeholder="Correo electrónico"
                  htmlFor="user-email"
                  onChange={handleChange}
                  error={errors.userEmail}
                />

                <div className="relative">
                  <Input
                    label="Confirmar correo electrónico"
                    name="confirmEmail"
                    type="email"
                    value={formData.confirmEmail}
                    placeholder="Confirmar correo electrónico"
                    htmlFor="confirm-email"
                    onChange={handleChange}
                    error={errors.confirmEmail}
                  />

                  <button
                    type="button"
                    className="absolute right-0 -bottom-6 text-xs text-gray-700 flex items-center gap-1 hover:underline"
                  >
                    <span>+</span>
                    Agregar correo
                  </button>
                </div>

                <Input
                  label="Contraseña"
                  name="userPassword"
                  type="password"
                  value={formData.userPassword}
                  placeholder="Escribe tu contraseña"
                  htmlFor="user-password"
                  onChange={handleChange}
                  error={errors.userPassword}
                />
              </div>
            </div>

            <div className="pt-6 border-[var(--color-primary-950)]/20 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6 bg-[var(--color-primary-100)] p-3 rounded-xl px-5 border border-[var(--color-primary-200)]">
                <span className="font-bold text-gray-700 text-sm uppercase">
                  Estado:
                </span>

                <div className="flex gap-4">
                  <Checkbox
                    id="isActive"
                    name="isActive"
                    label="Activo"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />

                  <Checkbox
                    id="isStaff"
                    name="isStaff"
                    label="Inactivo"
                    checked={formData.isStaff}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex gap-4 self-end">
                <Button
                  variant="cancel"
                  size="cancel"
                  type="button"
                  onClick={() => navigate("/auth")}
                >
                  Cancelar
                </Button>

                <Button
                  variant="finish"
                  size="finish"
                  type="submit"
                >
                  Finalizar
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
