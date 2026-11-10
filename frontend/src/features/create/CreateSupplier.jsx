import { useState, useEffect } from "react";
import { Input, Select, Checkbox, Button, FileInput, CheckboxGroup } from "@/shared";
import { getSupplierDocumentTypes } from "@/services/selectSupplierService";
import { getSupplierProducts } from "@/services/selectProductService";
import { supplierSchema } from "../users/schemas/supplierSchema";
import { createSupplier } from "@/features/suppliers/services/supplierServices";
import Navbar from "@/shared/layouts/Navbar";
import { useNavigate } from "react-router-dom";
import backgroundImage from "@/assets/images/restaurant.jpg";
import {
  showSuccessAlert,
  showUserErrorAlert,
} from "@/shared/services/alertService";

export default function SupplierRegisterForm() {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    supplierName: "",
    supplierEmail: "",
    confirmSupplierEmail: "",
    supplierPhone: "",
    supplierDocumentType: "",
    supplierDocumentNumber: "",
    supplierPassword: "",
    supplierAddress: "",
    suppliedProducts: [],
    observations: "",
    supplierImage: [],
    isActive: true,
  });

  const [files, setFiles] = useState([]);

  const navigate = useNavigate();

  const [documentTypes, setDocumentTypes] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getSupplierProducts().then(setProducts);
  }, []);

  useEffect(() => {
    getSupplierDocumentTypes().then(setDocumentTypes);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "suppliedProducts") {
      setFormData((prev) => ({
        ...prev,
        suppliedProducts: checked
          ? [...prev.suppliedProducts, value]
          : prev.suppliedProducts.filter((item) => item !== value),
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToValidate = {
      ...formData,
      supplierImage: files,
    };

    const result = supplierSchema.safeParse(dataToValidate);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });

      setErrors(fieldErrors);

      await showUserErrorAlert({
        title: "Error al crear proveedor",
        text: "Hay campos vacíos o datos incorrectos. Por favor, verifica la información ingresada.",
      });

      return;
    }

    setErrors({});

    try {
      await createSupplier(result.data);

      await showSuccessAlert({
        title: "Proveedor creado correctamente",
        text: "El proveedor se registró correctamente.",
        confirmButtonText: "Aceptar",
        timer: 3000,
      });

      navigate("/dashboard/supplierList");
    } catch (error) {
      console.error("Error al crear el proveedor:", error);

      await showUserErrorAlert({
        title: "Error al crear proveedor",
        text: error.message || "No fue posible registrar el proveedor.",
      });
    }
  };

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
            onClick={() => navigate("/dashboard/supplierList")}
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
              Registrar Proveedor
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">

              <div className="space-y-4">

                <Input
                  label="Nombre de la Empresa"
                  name="supplierName"
                  type="text"
                  value={formData.supplierName}
                  placeholder="Empresa"
                  htmlFor="supplier-name"
                  onChange={handleChange}
                  error={errors.supplierName}
                />

                <Select
                  label="Tipo de documento"
                  name="supplierDocumentType"
                  value={formData.supplierDocumentType}
                  htmlFor="supplierDocumentType"
                  onChange={handleChange}
                  options={documentTypes}
                  error={errors.supplierDocumentType}
                />

                <Input
                  label="Número de documento"
                  name="supplierDocumentNumber"
                  type="text"
                  value={formData.supplierDocumentNumber}
                  placeholder="Número de documento"
                  htmlFor="supplier-document-number"
                  onChange={handleChange}
                  error={errors.supplierDocumentNumber}
                />

              </div>

              <div className="space-y-5 flex flex-col items-center">

                <div className="w-full flex justify-center">
                  <FileInput
                    value={files}
                    onChange={setFiles}
                    multiple={false}
                    accept="image/*"
                  />
                </div>

                <Input
                  label="Dirección"
                  name="supplierAddress"
                  type="text"
                  value={formData.supplierAddress}
                  placeholder="Dirección"
                  htmlFor="supplier-address"
                  onChange={handleChange}
                  error={errors.supplierAddress}
                />

                <div className="relative">
                  <Input
                    label="Número de contacto"
                    name="supplierPhone"
                    type="tel"
                    value={formData.supplierPhone}
                    placeholder="Número de contacto"
                    htmlFor="supplier-phone"
                    onChange={handleChange}
                    error={errors.supplierPhone}
                  />

                  <button
                    type="button"
                    className="absolute right-0 -bottom-6 text-xs text-gray-700 flex items-center gap-1 hover:underline"
                  >
                    <span>+</span> Agregar teléfono
                  </button>
                </div>

              </div>

              <div className="space-y-5">

                <Input
                  label="Correo electrónico Empresa"
                  name="supplierEmail"
                  type="email"
                  value={formData.supplierEmail}
                  placeholder="Correo electrónico Empresa"
                  htmlFor="supplier-email"
                  onChange={handleChange}
                  error={errors.supplierEmail}
                />

                <div className="relative">
                  <Input
                    label="Confirmar correo electrónico"
                    name="confirmSupplierEmail"
                    type="email"
                    value={formData.confirmSupplierEmail}
                    placeholder="Confirmar correo electrónico"
                    htmlFor="confirm-supplier-email"
                    onChange={handleChange}
                    error={errors.confirmSupplierEmail}
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
                  name="supplierPassword"
                  type="password"
                  value={formData.supplierPassword}
                  placeholder="Escribe tu contraseña"
                  htmlFor="supplier-password"
                  onChange={handleChange}
                  error={errors.supplierPassword}
                />

              </div>

              <div>

                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Observaciones
                </label>

                <textarea
                  name="observations"
                  rows={4}
                  value={formData.observations}
                  onChange={handleChange}
                  placeholder="Escriba observaciones del proveedor..."
                  className="w-full rounded-xl border border-gray-300 p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-700)]"
                />

                {errors.observations && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.observations}
                  </p>
                )}

              </div>

              <div className="flex justify-center">

                <CheckboxGroup
                  label="Productos que suministra"
                  className=""
                  name="suppliedProducts"
                  options={products}
                  value={formData.suppliedProducts}
                  onChange={handleChange}
                />

                {errors.suppliedProducts && (
                  <p className="text-red-500 text-sm">
                    {errors.suppliedProducts}
                  </p>
                )}

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
                    name="isActive"
                    label="Inactivo"
                    checked={!formData.isActive}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        isActive: false,
                      }))
                    }
                  />

                </div>

              </div>

              <div className="flex gap-4 self-end">

                <Button
                  variant="cancel"
                  size="cancel"
                  type="button"
                  onClick={() => navigate("/dashboard/supplierList")}
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
