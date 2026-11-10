
import { useState, useEffect } from "react";
import {
  Input,
  Select,
  Checkbox,
  Button,
  FileInput,
  CheckboxGroup,
} from "@/shared";

import { getSupplierDocumentTypes } from "@/services/selectSupplierService";
import { getSupplierProducts } from "@/services/selectProductService";

import {
  supplierUpdateSchema,
} from "../../users/schemas/supplierSchema";

import {
  getAllSuppliers,
  updateSupplier,
} from "../../suppliers/services/supplierServices.js";

import Navbar from "@/shared/layouts/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import backgroundImage from "@/assets/images/restaurant.jpg";

import {
  showSuccessAlert,
  showUserErrorAlert,
} from "@/shared/services/alertService";

export default function UpdateSupplier() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
  const [documentTypes, setDocumentTypes] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [types, availableProducts] = await Promise.all([
          getSupplierDocumentTypes(),
          getSupplierProducts(),
        ]);

        setDocumentTypes(types);
        setProducts(availableProducts);
      } catch (error) {
        console.error("Error al cargar opciones:", error);

        await showUserErrorAlert({
          title: "Error",
          text: "No fue posible cargar los tipos de documento o productos.",
        });
      }
    };

    loadOptions();
  }, []);

  useEffect(() => {
    const loadSupplier = async () => {
      try {
        const suppliers = await getAllSuppliers();

        const supplier = suppliers.find(
          (item) => Number(item.id) === Number(id)
        );

        if (!supplier) {
          await showUserErrorAlert({
            title: "Proveedor no encontrado",
            text: "No se encontró el proveedor solicitado.",
          });

          navigate("/dashboard/supplierList");
          return;
        }

        let suppliedProducts = supplier.supplied_products || [];

        if (typeof suppliedProducts === "string") {
          try {
            suppliedProducts = JSON.parse(suppliedProducts);
          } catch {
            suppliedProducts = [];
          }
        }

        if (!Array.isArray(suppliedProducts)) {
          suppliedProducts = [];
        }

        suppliedProducts = suppliedProducts.map(String);

        setFormData({
          supplierName: supplier.supplier_name || "",
          supplierEmail: supplier.supplier_email || "",
          confirmSupplierEmail: supplier.supplier_email || "",
          supplierPhone: supplier.supplier_phone || "",
          supplierDocumentType: supplier.supplier_document_type || "",
          supplierDocumentNumber:
            supplier.supplier_document_number || "",
          supplierPassword: "",
          supplierAddress: supplier.supplier_address || "",
          suppliedProducts,
          observations: supplier.observations || "",
          supplierImage: [],
          isActive: supplier.is_active,
        });
      } catch (error) {
        console.error("Error al consultar proveedor:", error);

        await showUserErrorAlert({
          title: "Error al cargar proveedor",
          text: error.message || "No fue posible consultar el proveedor.",
        });

        navigate("/dashboard/supplierList");
      } finally {
        setLoading(false);
      }
    };

    loadSupplier();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "suppliedProducts") {
      setFormData((prev) => ({
        ...prev,
        suppliedProducts: checked
          ? [...prev.suppliedProducts, String(value)]
          : prev.suppliedProducts.filter(
              (item) => item !== String(value)
            ),
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

    if (saving) return;

    const dataToValidate = {
      ...formData,
      supplierImage: files,
    };

    const result = supplierUpdateSchema.safeParse(dataToValidate);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });

      setErrors(fieldErrors);

      await showUserErrorAlert({
        title: "Error al actualizar proveedor",
        text: "Hay campos vacíos o datos incorrectos. Por favor, verifica la información ingresada.",
      });

      return;
    }

    setErrors({});
    setSaving(true);

    try {
      const supplierData = {
        supplierName: formData.supplierName,
        supplierEmail: formData.supplierEmail,
        confirmSupplierEmail: formData.confirmSupplierEmail,
        supplierPhone: formData.supplierPhone,
        supplierDocumentType: formData.supplierDocumentType,
        supplierDocumentNumber: formData.supplierDocumentNumber,
        supplierPassword: formData.supplierPassword.trim() || null,
        supplierAddress: formData.supplierAddress,
        suppliedProducts: formData.suppliedProducts,
        observations: formData.observations,
        isActive: formData.isActive,
      };

      await updateSupplier(id, supplierData);

      await showSuccessAlert({
        title: "Proveedor actualizado correctamente",
        text: "La información del proveedor se actualizó correctamente.",
        confirmButtonText: "Aceptar",
        timer: 3000,
      });

      navigate("/dashboard/supplierList");
    } catch (error) {
      console.error("Error al actualizar proveedor:", error);

      await showUserErrorAlert({
        title: "Error al actualizar proveedor",
        text: error.message || "No fue posible actualizar el proveedor.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">
          Cargando información del proveedor...
        </p>
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
              Actualizar Proveedor
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">

              <div className="space-y-4">
                <Input
                  label="Actualizar - Nombre de la Empresa"
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
                    label="Actualizar - Número de contacto"
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
                  label="Actualizar - Correo electrónico Empresa"
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
                  label="Actualizar - Contraseña"
                  name="supplierPassword"
                  type="password"
                  value={formData.supplierPassword}
                  placeholder="Deja vacío para conservar la contraseña actual"
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
                <div>
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
