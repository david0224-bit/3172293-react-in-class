import { useState, useEffect } from "react";
import {
  Input,
  SelectInventory,
  Checkbox,
  Button,
  FileInput
} from "@/shared";
import {
  showSuccessAlert,
  showUserErrorAlert,
} from "@/shared/services/alertService";
import { getSupplierNames } from "@/services/selectService";
import { inventorySchema } from "../users/schemas/inventorySchema";
import { createInventory } from "@/features/inventory/services/inventoryServices";
import Navbar from "@/shared/layouts/Navbar";
import { useNavigate } from "react-router-dom";
import backgroundImage from "@/assets/images/restaurant.jpg";

export default function CreateProductInventory() {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    productName: "",
    productId: "",
    productQuantity: "",
    productSupplierNames: "",
    productSupplierNit: "",
    productDescription: "",
    productPrice: "",
    productEntryDate: "",
    productImage: [],
    isStaff: false,
    isActive: true,
  });

  const [files, setFiles] = useState([]);

  const navigate = useNavigate();

  const [supplierNames, setSupplierNames] = useState([]);

  useEffect(() => {
    getSupplierNames().then(setSupplierNames);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = inventorySchema.safeParse({
      ...formData,
      productImage: files,
    });

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });

      setErrors(fieldErrors);

      await showUserErrorAlert({
        title: "Error al crear producto",
        text: "Hay campos vacíos o datos incorrectos. Por favor, verifica la información ingresada.",
      });

      return;
    }

    setErrors({});

    try {
      await createInventory(result.data);

      await showSuccessAlert({
        title: "Producto creado correctamente",
        text: "El producto se registró correctamente en el inventario.",
        confirmButtonText: "Aceptar",
        timer: 3000,
      });

      navigate("/dashboard/inventoryList");
    } catch (error) {
      console.error("Error al registrar producto:", error);

      await showUserErrorAlert({
        title: "Error al crear producto",
        text: error.message || "No fue posible registrar el producto en el inventario.",
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
            onClick={() => navigate("/dashboard/inventoryList")}
          >
            <span>←</span> Atrás
          </Button>

          <button
            type="button"
            className="absolute top-6 left-240 bg-[var(--color-primary-950)] text-white px-4 py-2 rounded-lg text-md font-semibold flex items-center gap-1 hover:bg-[var(--color-primary-900)] transition"
            onClick={() => navigate("/dashboard/inventoryList")}
          >
            <span>👁️‍🗨️</span> Ver inventario
          </button>

          <div className="flex items-center gap-2 mt-8 mb-6 border-b border-[var(--color-primary-950)]/30 pb-3">
            <div className="text-2xl text-[var(--color-text-inverse)]">
              📋
              <span className="font-bold text-xl relative -top-2 -left-1">
                +
              </span>
            </div>

            <h2 className="text-[var(--color-text-inverse)] font-bold text-xl uppercase tracking-wider">
              Registrar producto
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">

              <div className="space-y-4">
                <Input
                  label="Nombre del producto"
                  name="productName"
                  type="text"
                  value={formData.productName}
                  placeholder="Nombre del producto"
                  htmlFor="user-name"
                  onChange={handleChange}
                  error={errors.productName}
                />

                <Input
                  label="ID del producto"
                  name="productId"
                  type="text"
                  value={formData.productId}
                  placeholder="ID del producto"
                  htmlFor="product-name"
                  onChange={handleChange}
                  error={errors.productId}
                />

                <Input
                  label="Nit del proveedor"
                  name="productSupplierNit"
                  type="text"
                  value={formData.productSupplierNit}
                  placeholder="Nit del proveedor"
                  htmlFor="user-document-number"
                  onChange={handleChange}
                  error={errors.productSupplierNit}
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
                  label="Precio total"
                  name="productPrice"
                  type="text"
                  value={formData.productPrice}
                  placeholder="Precio total"
                  onChange={handleChange}
                  error={errors.productPrice}
                />

                <div className="relative">
                  <Input
                    label="Cantidad del producto"
                    name="productQuantity"
                    type="text"
                    value={formData.productQuantity}
                    placeholder="Cantidad del producto"
                    htmlFor="user-phone"
                    onChange={handleChange}
                    error={errors.productQuantity}
                  />

                  <button
                    type="button"
                    className="absolute right-0 -bottom-6 text-xs text-gray-700 flex items-center gap-1 hover:underline"
                  >
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                <SelectInventory
                  label="Nombre del proveedor"
                  name="productSupplierNames"
                  value={formData.productSupplierNames}
                  htmlFor="productSupplierNames"
                  onChange={handleChange}
                  options={supplierNames}
                  error={errors.productSupplierNames}
                />

                <div className="relative">
                  <Input
                    label="Descripcion del producto"
                    name="productDescription"
                    value={formData.productDescription}
                    type="text"
                    placeholder="Descripcion del producto"
                    onChange={handleChange}
                    error={errors.productDescription}
                  />
                </div>

                <Input
                  label="fecha ingreso"
                  name="productEntryDate"
                  type="date"
                  value={formData.productEntryDate}
                  placeholder="Fecha de ingreso"
                  htmlFor="product-entry-date"
                  onChange={handleChange}
                  error={errors.productEntryDate}
                />
              </div>
            </div>

            <div className="pt-6 border-[var(--color-primary-950)]/20 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6 bg-[var(--color-primary-200)] p-3 rounded-xl px-5 border-2 border-[var(--color-primary-800)]">
                <span className="font-bold text-gray-700 text-sm uppercase">
                  Estado en el inventario:
                </span>

                <div className="flex gap-4">
                  <Checkbox
                    id="isActive"
                    name="isActive"
                    label="Disponible"
                    checked={formData.isActive}
                    onChange={handleChange}
                  />

                  <Checkbox
                    id="isStaff"
                    name="isStaff"
                    label="Agotado"
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
                  onClick={() => navigate("/dashboard/inventoryList")}
                >
                  Cancelar
                </Button>

                <Button
                  variant="finish"
                  size="finish"
                  type="submit"
                >
                  Registrar
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
