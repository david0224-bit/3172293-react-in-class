// src/users/pages/UserListPage.js

import { DataTable } from "@/shared"
import { UserColumns } from "../table/UserColumns"
import { users } from "../data/users"
import { Button } from "../../../shared";
import { Link } from "react-router-dom";
import ReportConfigModal from "../reports/components/ReportConfigModal";
import { useState } from "react";

export default function UserListPage() {

    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    return (
        <div className="p-6">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Listador de Usuarios</h1>

            <div className="flex gap-12">
            <Button size="sm" variant="primary" onClick={() => setIsReportModalOpen(true)}>
            Reportar usuario
            </Button>

            <Link to="/dashboard/userCreate">
            <Button size="sm" variant="primary">
            Crear usuario
            </Button>
            </Link>
            </div>
        </div>
        <DataTable data={users} columns={UserColumns} />

        <ReportConfigModal
            isOpen={isReportModalOpen}
            onClose={() => setIsReportModalOpen(false)}/>

        </div>
    );
}