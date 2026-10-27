// src/users/pages/UserListPage.js

import { DataTable, Button } from "@/shared";
import { UserColumns } from "../table/UsersColumns";
import { users } from "../data/users";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ReportConfigModal from "../reports/components/ReportConfigModal"

export default function UserListPage(){
    const navigate = useNavigate();
    const [report, setReport] = useState(false)

    return (
        <div className="p-6">

                    <div className="flex justify-end mb-4 gap-4">
                        <ReportConfigModal
                            isOpen={report}
                            onClose={() => setReport(false)}    
                        />
                    
                        <Button
                            size="sm"
                            variant="primary"
                            onClick={() => navigate("/dashboard/usersCreate")}    
                        >
                            Crear usuario
                        </Button>

                        <Button
                            size="sm"
                            variant="primary"
                            onClick={() => {
                                setReport(true)
                            }}
                        >
                            Reportar usuario
                        </Button>
                    </div>

                        <h1 className="text-xl font-semibold mb-4">Listado de Usuarios</h1>

            <DataTable data={users} columns={UserColumns} />

        </div>
    );
}