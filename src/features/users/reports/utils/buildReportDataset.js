// Funcion utilitaria para construir el dataset de un reporte (tabla)
// Patron: transformacion de datos (input -> output listo para exportar)
export function builReportDataset ({
    users,              // Array de usuarios origen
    selectedFields,     // Campose seleccionados para el reporte [{ key, label}]
    scope,              // Alcance del reporte: "all" | "document"
    documentNumber      // NUmero de documento para filtrar (si aplica)
}) {

    // Copia inmutable del array original (evita mutaciones)
    let filteredUsers = [...users];

    // Filtro por alcance: si es por documento, se aplica el filtro especifico
    if (scope === "document" && documentNumber) {
        filteredUsers = filteredUsers.filter(
            (user) => user.document_number === documentNumber
        );
    }

    // Construccion de encabezados del reporte
    // Se toma el label de cada campo seleccionado
    const headers = selectedFields.map((field) => field.label);

    // Construccion de filas del reporte
    // Cada usuario se transforma en un array de valores segun los campos seleccionados
    const rows = filteredUsers.map((user) => 
        selectedFields.map((field) => {
            const value = user[field.key]; // Acceso dinamico a la propiedad

            // Normalizacion: evita undefined o null en el reporte
            return value ?? "";
        })
    );

    // Estructura final desacoplada de la UI
    // Lista para exportar a Excel, PDF o renderizar en tabla
    return {
        headers,    // Array de strings (columnas)
        rows,    // Array de arrays (filas)
    }; 
}