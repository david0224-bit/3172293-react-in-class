import { buildReportDataset } from "../utils/buildReportDataset";

import { generateExcelReport } from "./generateExcelReport";
import { generatePdfReport } from "./generatePdfReport";

export function generateUserReport({
  users,
  format,
  selectedFields,
  scope,
  documentNumber,
}) {
  // Adaptar los nombres recibidos desde PostgreSQL
  const normalizedUsers = users.map((user) => ({
    ...user,
    userName: user.userName ?? user.user_name,
    userEmail: user.userEmail ?? user.user_email,
    userDocumentTypes:
      user.userDocumentTypes ?? user.user_document_types,
    userDocumentNumber:
      user.userDocumentNumber ?? user.user_document_number,
    userPhone: user.userPhone ?? user.user_phone,
    isActive: user.isActive ?? user.is_active,
  }));

  const { headers, rows } = buildReportDataset({
    users: normalizedUsers,
    selectedFields,
    scope,
    documentNumber,
  });

  if (!rows.length) {
    alert("No hay datos para generar el reporte.");
    return;
  }

  const timestamp = new Date().toISOString().slice(0, 10);

  if (format === "excel") {
    generateExcelReport({
      headers,
      rows,
      fileName: `users-report-${timestamp}.xlsx`,
    });
  }

  if (format === "pdf") {
    generatePdfReport({
      headers,
      rows,
      fileName: `users-report-${timestamp}.pdf`,
    });
  }
}