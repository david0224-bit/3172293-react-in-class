// Libreria para generacion de PDFs en el cliente
import jsPDF from "jspdf";

// Plugin para creacion de tablas dentro del PDF
import autoTable from "jspdf-autotable"

// Funcion utilitaria para generar un reporte en PDF
// Patron: exportacion de datos (dataset -> documento estructurado)
export function generatePdfReport({
    headers,                        // Encabezados de la tabla (columnas)
    rows,                           // Datos (array de filas)
    fileName = "user-report.pdf"    // Nombre del archivo de salida
}) {

    // Inicializa el docuumento PDF
    const doc = new jsPDF();

    // Configuracion del tirulo
    doc.setFontSize(16);
    doc.text("Reporte de Usuarios", 14, 20); // Posicion (x, y)

    // Generacion de la tabla automatica
    autoTable(doc, {
        startY: 30,         // Posicion inicial debajo del titulo

        head: [headers],    // Encabezados (debe ser array de arrays)
        body: rows,         // Filas del reporte

        theme: "grid",      // Estilo visual de la tabla

        // Estilos globales de las celdas
        styles: {
            fontSize: 10
        },

        // Margenes del documento
        margin: {
            left: 14,
            right: 14
        }
    });

    // Genera y descarga el archivo PDF
    doc.save(fileName);
}