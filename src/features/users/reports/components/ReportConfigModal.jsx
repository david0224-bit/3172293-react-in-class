// Hook para manejo de estado local en componentes funcionales
import { useState } from "react";

// Configuracion de campos dsiponibles para el reporte
import { userReportFields } from "../../config/userReportFields";

// Caso de uso orquesta la generacion del reporte
import { generateUserReport } from "../services/generateUserReport";

// Componentes UI reutilizables (design system)
import { Button, Input, Select } from "@/shared";
import Checkbox from "@/shared/components/Checkbox";

// Componente modal para configuracion de reportes
export default function ReportConfigModal({ isOpen, onClose }) {

    // Estado del formato de salida
    const [format, setFormat] = useState("pdf");

    // Estado del alcance del reporte
    const [scope, setScope] = useState("all");

    // Estado para filtro por documento
    const [documentNumber, setDocumentNumber] = useState("");
    
    // Estado de campos seleccionados (inicializacion lazy)
    const [selectedFields, setSelectedFields] = useState(() =>
        userReportFields.filter((f) => f.default) // Solo campos marcados por defecto
    );

    // Control de render: si el modal no esta abierto, no se monta en el DOM
    if (!isOpen) return null;

    // Handler para activar/desactivar campos del reporte
    const handleFieldToggle = (field) => {

        // Verifica si el campo ya esta selecionado
        const exists = selectedFields.find((f) => f.key === field.key);

        if (exists) {
            // Elimina el campo si ya existe
            setSelectedFields(
                selectedFields.filter((f) => f.key !== field.key)
            );
        } else {
            // Agrega el campo si no existe
            setSelectedFields([
                ...selectedFields,
                field
            ]);
        }
    };

    // Handler principal para generar el reporte
    const handleGenerateReport = () => {
        // Invoca el caso de uso con la configuracion actual
        generateUserReport({
            format,
            selectedFields,
            scope,
            documentNumber,
        });

        // Cierra el modal despues de generar el reporte
        onClose();
    };

    return (
        // Overlay del modal
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

            {/* Contenedor del modal */}
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">

                {/* Titulo */}
                <h2 className="mb-6 text-xl font-semibold">
                    Generar reporte de usuarios
                </h2>

                {/* Seleccion de formato */}
                <div className="mb-4">
                    <Select
                        label="Formato del reporte"
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        options={[
                            { label: "PDF", value: "pdf" },
                            { label: "Excel", value: "excel" },
                        ]}
                    />
                </div>

                {/* Seleccion de campos */}
                <div className="mb-4">
                    <p className="mb-2 font-medium">Campos del reporte</p>

                    {/* Grid de checkboxes */}
                    <div className="grid grid-cols-2 gap-2">
                        {userReportFields.map((field) => {

                            // Determina si el campo esta seleccionado
                            const checked = selectedFields.some(
                                (f) => f.key === field.key
                            );

                            return (
                                <Checkbox
                                    key={field.key}         // Key unica para renderizado
                                    id={field.key}          // Id accesible
                                    name={field.key}        // Nombre del campo
                                    label={field.label}     // Texto visible
                                    checked={checked}       // Estado controlado               
                                    onChange={() => handleFieldToggle(field)} // Toggle
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Seleccion de alcance */}
                <div className="mb-4">
                    <Select
                        label="Alcance del reporte"
                        value={scope}
                        onChange={(e) => setScope(e.target.value)}
                        options={[
                            { label: "Todos los usuarios", value: "all" },
                            { label: "Filtrar por documento", value: "document" },
                        ]}
                    />
                </div>

                {/* Campo condicional para filtro por documento */}
                {scope === "document" && (
                    <div className="mb-4">
                        <Input
                            label="Numero de documento"
                            value={documentNumber}
                            onChange={(e) => setDocumentNumber(e.target.value)}
                            placeholder="Ingrese numero de documento"
                        />
                    </div>
                )}

                {/* Acciones del modal */}
                <div className="flex justify-end gap-2 mt-6">

                    {/* Boton cancelar */}
                    <Button variant="secondary" onClick={onClose}>
                        Cancelar
                    </Button>

                    {/* Boton generar reporte */}
                    <Button variant="primary" onClick={handleGenerateReport}>
                        Generar reporte
                    </Button>

                </div>
            </div>
        </div>
    );
}
