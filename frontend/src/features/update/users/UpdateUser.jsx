import { useState, useEffect } from "react";
import { Input, Select, Checkbox, Button, FileInput } from "@/shared";
import { getDocumentTypes } from "@/services/selectService";
import { userUpdateSchema } from "../../users/schemas/userSchema";
import {
  getAllUsers,
  updateUser,
} from "../../users/services/userServices.js";
import Navbar from "@/shared/layouts/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import backgroundImage from "@/assets/images/restaurant.jpg";
import {
  showSuccessAlert,
  showUserErrorAlert,
} from "@/shared/services/alertService";

export default function UpdateUser() {
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getDocumentTypes()
      .then(setDocumentTypes)
      .catch((error) => {
        console.error("Error al cargar tipos de documento:", error);
      });
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);

        const users = await getAllUsers();

        const userData = users.find(
          (user) => Number(user.id) === Number(id)
        );

        if (!userData) {
          await showUserErrorAlert({
            title: "Usuario no encontrado",
            text: "No se encontró el usuario seleccionado.",
          });

          navigate("/dashboard/userList");
          return;
        }

        setFormData({
          userName: userData.user_name || "",
          userEmail: userData.user_email || "",
          confirmEmail:
            userData.confirm_email || userData.user_email || "",
          userPhone: userData.user_phone || "",
          userAddress: userData.user_address || "",
          userDocumentTypes: userData.user_document_types || "",
          userDocumentNumber: userData.user_document_number || "",
          userPassword: "",
          userImage: [],
          isStaff: userData.is_staff ?? false,
          isActive: userData.is_active ?? true,
          isSuperUser: userData.is_superuser ?? false,
        });
      } catch (error) {
        console.error("Error al cargar el usuario:", error);

        await showUserErrorAlert({
          title: "Error al cargar usuario",
          text: "No fue posible obtener la información del usuario.",
        });

        navigate("/dashboard/userList");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadUser();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saving) return;

    const result = userUpdateSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });

      setErrors(fieldErrors);

      await showUserErrorAlert({
        title: "Error al actualizar usuario",
        text: "Hay campos vacíos o datos incorrectos. Por favor, verifica la información ingresada.",
      });

      return;
    }

    setErrors({});
    setSaving(true);

    try {
      const userData = {
        userName: formData.userName,
        userEmail: formData.userEmail,
        confirmEmail: formData.confirmEmail,
        userPhone: formData.userPhone,
        userAddress: formData.userAddress,
        userDocumentTypes: formData.userDocumentTypes,
        userDocumentNumber: formData.userDocumentNumber,
        userPassword: formData.userPassword.trim() || null,
        isStaff: formData.isStaff,
        isActive: formData.isActive,
        isSuperUser: formData.isSuperUser,
      };

      await updateUser(id, userData);

      await showSuccessAlert({
        title: "Usuario actualizado",
        text: "La información del usuario se actualizó correctamente.",
        confirmButtonText: "Aceptar",
      });

      navigate("/dashboard/userList");

    } catch (error) {
      console.error("Error al actualizar usuario:", error);

      await showUserErrorAlert({
        title: "Error al actualizar usuario",
        text: error.message || "No fue posible actualizar el usuario.",
      });

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="bg-white p-6 rounded-xl shadow-md">
          <p className="text-gray-800 font-semibold">
            Cargando información del usuario...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col font-sans bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />

      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="w-full max-w-6xl bg-gradient-to-b from-[var(--color-primary-800)] to-[var(--color-primary-200)] rounded-3xl p-8 shadow-md relative">

          <Button
            variant="back"
            size="back"
            type="button"
            onClick={() => navigate("/dashboard/userList")}
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
              Actualizar usuario
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">

              <div className="space-y-4">
                <Input
                  label="Actualizar - Nombre completo"
                  name="userName"
                  type="text"
                  value={formData.userName}
                  placeholder="Nombre completo"
                  htmlFor="user-name"
                  onChange={handleChange}
                  error={errors.userName}
                />

                <Select
                  label="Actualizar - Tipo de documento"
                  name="userDocumentTypes"
                  value={formData.userDocumentTypes}
                  htmlFor="userDocumentTypes"
                  onChange={handleChange}
                  options={documentTypes}
                  error={errors.userDocumentTypes}
                />

                <Input
                  label="Actualizar - Número de documento"
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
                    onChange={(newFiles) => {
                      setFiles(newFiles);

                      setFormData((prev) => ({
                        ...prev,
                        userImage: newFiles,
                      }));
                    }}
                    multiple={false}
                    accept="image/*"
                  />
                </div>

                <Input
                  label="Actualizar - Dirección"
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
                    label="Actualizar - Número telefónico"
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
                  label="Actualizar - Correo electrónico"
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
                  label="Actualizar - Contraseña"
                  name="userPassword"
                  type="password"
                  value={formData.userPassword}
                  placeholder="Deja vacío para conservar la contraseña actual"
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
                    id="isInactive"
                    name="isInactive"
                    label="Inactivo"
                    checked={!formData.isActive}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        isActive: !e.target.checked,
                      }));
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-4 self-end">
                <Button
                  variant="cancel"
                  size="cancel"
                  type="button"
                  onClick={() => navigate("/dashboard/userList")}
                >
                  Cancelar
                </Button>

                <Button
                  variant="finish"
                  size="finish"
                  type="submit"
                  disabled={saving}
                >
                  {saving ? "Guardando..." : "Finalizar"}
                </Button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
