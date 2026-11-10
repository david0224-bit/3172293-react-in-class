
import { useState, useEffect } from "react";
import {
  Input,
  SelectInventory,
  Checkbox,
  Button,
  FileInput,
} from "@/shared";

import { getSupplierNames } from "@/services/selectService";
import {
  inventoryUpdateSchema,
} from "../../users/schemas/inventorySchema";

import {
  getAllInventory,
  updateInventory,
} from "@/features/inventory/services/inventoryServices.js";

import Navbar from "@/shared/layouts/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import backgroundImage from "@/assets/images/restaurant.jpg";

import {
  showSuccessAlert,
  showUserErrorAlert,
} from "@/shared/services/alertService";

export default function UpdateInventory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
  const [supplierNames, setSupplierNames] = useState([]);

  useEffect(() => {
    const loadSuppliers = async () => {
      try {
        const suppliers = await getSupplierNames();
        setSupplierNames(suppliers);
      } catch (error) {
        console.error("Error al cargar proveedores:", error);
      }
    };

    loadSuppliers();
  }, []);

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const inventoryList = await getAllInventory();

        const inventory = inventoryList.find(
          (item) => Number(item.id) === Number(id)
        );

        if (!inventory) {
          await showUserErrorAlert({
            title: "Registro no encontrado",
            text: "No se encontró el registro de inventario solicitado.",
          });

          navigate("/dashboard/inventoryList");
          return;
        }

        setFormData({
          productName: inventory.product_name || "",
          productId: String(inventory.product_id ?? ""),
          productQuantity: String(inventory.product_quantity ?? ""),
          productSupplierNames: inventory.product_supplier_names || "",
          productSupplierNit: inventory.product_supplier_nit || "",
          productDescription: inventory.product_description || "",
          productPrice: String(inventory.product_price ?? ""),
          productEntryDate: inventory.product_entry_date
            ? String(inventory.product_entry_date).slice(0, 10)
            : "",
          productImage: [],
          isStaff: Boolean(inventory.is_staff),
          isActive: Boolean(inventory.is_active),
        });
      } catch (error) {
        console.error("Error al cargar inventario:", error);

        await showUserErrorAlert({
          title: "Error al cargar inventario",
          text: error.message || "No fue posible consultar el registro.",
        });

        navigate("/dashboard/inventoryList");
      } finally {
        setLoading(false);
      }
    };

    loadInventory();
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

    const result = inventoryUpdateSchema.safeParse({
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
        title: "Error al actualizar inventario",
        text: "Hay campos vacíos o datos incorrectos. Por favor, verifica la información ingresada.",
      });

      return;
    }

    setErrors({});
    setSaving(true);

    try {
      const inventoryData = {
        productName: formData.productName,
        productId: formData.productId,
        productQuantity: formData.productQuantity,
        productSupplierNames: formData.productSupplierNames,
        productSupplierNit: formData.productSupplierNit,
        productDescription: formData.productDescription,
        productPrice: formData.productPrice,
        productEntryDate: formData.productEntryDate,
        isActive: formData.isActive,
        isStaff: formData.isStaff,
      };

      await updateInventory(id, inventoryData);

      await showSuccessAlert({
        title: "Inventario actualizado correctamente",
        text: "La información del inventario se actualizó correctamente.",
        confirmButtonText: "Aceptar",
        timer: 3000,
      });

      navigate("/dashboard/inventoryList");
    } catch (error) {
      console.error("Error al actualizar inventario:", error);

      await showUserErrorAlert({
        title: "Error al actualizar inventario",
        text: error.message || "No fue posible actualizar el inventario.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Cargando información del inventario...
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
            onClick={() => navigate("/dashboard/inventoryList")}
          >
            <span>←</span> Atrás
          </Button>

          <button
            type="button"
            className="absolute top-6 right-8 bg-[var(--color-primary-950)] text-white px-4 py-2 rounded-lg text-md font-semibold flex items-center gap-1 hover:bg-[var(--color-primary-900)] transition"
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
              Actualizar inventario
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
                  label="NIT del proveedor"
                  name="productSupplierNit"
                  type="text"
                  value={formData.productSupplierNit}
                  placeholder="NIT del proveedor"
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

                <Input
                  label="Descripción del producto"
                  name="productDescription"
                  value={formData.productDescription}
                  type="text"
                  placeholder="Descripción del producto"
                  onChange={handleChange}
                  error={errors.productDescription}
                />

                <Input
                  label="Fecha de ingreso"
                  name="productEntryDate"
                  type="date"
                  value={formData.productEntryDate}
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
                  disabled={saving}
                >
                  {saving ? "Guardando..." : "Actualizar"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
