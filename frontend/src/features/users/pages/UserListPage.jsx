import { DataTable } from "@/shared";
import { UserColumns } from "../table/UserColumns";
import { Button } from "../../../shared";
import { Link } from "react-router-dom";
import ReportConfigModal from "../reports/components/ReportConfigModal";
import { useState, useEffect } from "react";
import { getAllUsers } from "../services/userServices.js";

export default function UserListPage() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="p-6">
      <div
        className="
          rounded-2xl
          bg-white/80
          backdrop-blur-md
          shadow-lg
          p-6
          border border-white/40
        "
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Listador de Usuarios
          </h1>

          <div className="flex gap-4">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setIsReportModalOpen(true)}
            >
              Reportar usuario
            </Button>

            <Link to="/CreateUser">
              <Button size="sm" variant="primary">
                Crear usuario
              </Button>
            </Link>
          </div>
        </div>

        <DataTable data={users} columns={UserColumns} />
      </div>

      <ReportConfigModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        users={users}
      />
    </div>
  );
}