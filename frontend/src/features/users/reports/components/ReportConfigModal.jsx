
import { useState } from "react";
import { createPortal } from "react-dom";
import Button from "@/shared/components/Button";
import Checkbox from "@/shared/components/Checkbox";
import Select from "@/shared/components/Select";
import Input from "@/shared/components/Input";
import { generateUserReport } from "../services/generateUserReport";
import { userReportFields } from "../config/userReportFields";

export default function ReportConfigModal({
  isOpen,
  onClose,
  users = [],
}) {
  const [format, setFormat] = useState("pdf");
  const [scope, setScope] = useState("all");
  const [documentNumber, setDocumentNumber] = useState("");

  const [selectedKeys, setSelectedKeys] = useState(
    () => userReportFields
      .filter((field) => field.default)
      .map((field) => field.key)
  );

  if (!isOpen) return null;

  const toggleField = (key) => {
    setSelectedKeys((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key]
    );
  };

  const handleGenerate = () => {
    const selectedFields = userReportFields.filter((field) =>
      selectedKeys.includes(field.key)
    );

    if (!selectedFields.length) return;

    if (scope === "document" && !documentNumber.trim()) {
      alert("Debes ingresar el número de documento.");
      return;
    }

    generateUserReport({
      users,
      format,
      selectedFields,
      scope,
      documentNumber: documentNumber.trim(),
    });

    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[26px] bg-white px-6 py-6 shadow-2xl">
        <h2 className="mb-6 text-xl font-semibold">
          Generar reporte de usuarios
        </h2>

        <div className="mb-4">
          <Select
            label="Formato del reporte"
            value={format}
            onChange={(event) => setFormat(event.target.value)}
            options={[
              { label: "PDF", value: "pdf" },
              { label: "Excel", value: "excel" },
            ]}
          />
        </div>

        <p className="mb-2 font-medium">Campos del reporte:</p>

        <div className="grid grid-cols-2 gap-3">
          {userReportFields.map((field) => (
            <Checkbox
              key={field.key}
              id={`users-${field.key}`}
              label={field.label}
              checked={selectedKeys.includes(field.key)}
              onChange={() => toggleField(field.key)}
            />
          ))}
        </div>

        <div className="mt-5">
          <Select
            label="Alcance del reporte"
            value={scope}
            onChange={(event) => setScope(event.target.value)}
            options={[
              { label: "Todos los usuarios", value: "all" },
              { label: "Buscar por documento", value: "document" },
            ]}
          />
        </div>

        {scope === "document" && (
          <div className="mt-4">
            <Input
              label="Número de documento"
              value={documentNumber}
              onChange={(event) => setDocumentNumber(event.target.value)}
              placeholder="Ingrese el número de documento"
            />
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>

          <Button
            variant="primary"
            onClick={handleGenerate}
            disabled={!selectedKeys.length}
          >
            Generar reporte
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
