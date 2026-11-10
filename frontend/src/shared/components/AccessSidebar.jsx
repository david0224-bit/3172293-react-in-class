// frontend/src/features/access/components/AccessSidebar.jsx

import { useState, useEffect } from "react";
import { Select } from "@/shared";
import { getGroups } from "../../features/access/services/groupService";
import { getGroupPermissions } from "../../features/access/services/permissionService";

export default function AccessSidebar({
    selectedGroup,
    setSelectedGroup,
    setGroupPermissions,
    setSelectedGroupName,
}) {
    // Estado de grupos
    const [userId, setUserId] = useState("");

    // Estado de los grupos
    const [groups, setGroups] = useState([]);

    // 2. Efecto para obtener grupos (test)
    useEffect(() => {
        getGroups().then(setGroups).catch(console.error);
    }, []);

    // 3. Mapear los datos reales para el Select
    const groupOptions = groups.map((group) => ({
        value: String(group.group_id),
        label: group.group_name,
    }));

    const handleGroupChange = async (e) => {
        const groupId = e.target.value;
        const group = groups.find((g) => String(g.group_id) === groupId);

        setSelectedGroup(groupId);
        setSelectedGroupName(group?.group_name ?? "");
        setUserId("");

        // Sin grupo seleccionado: se limpia todo y no se llama al backend
        if (!groupId) {
            setGroupPermissions([])
            return;
        }

        try {
            const permissions = await getGroupPermissions(groupId);
            setGroupPermissions(permissions);
        } catch (error) {
            console.error(error);
        }
    };

    const userOptions = [
        { value: 10, label: "Sebastián Arce" },
        { value: 11, label: "Sofia Valencia" },
        { value: 12, label: "José Marín" }
    ];

    return (
        <aside className="w-[350px] space-y-12">
            <section>
                <h2 className="text-lg font-semibold mb-6">Grupos usuarios</h2>
                <Select
                    name="groupId"
                    value={selectedGroup}
                    onChange={handleGroupChange}
                    options={groupOptions}
                />
            </section>

            <section>
                <h2 className="text-lg font-semibold mb-6">Usuario individual</h2>
                <Select
                    name="userId"
                    value={userId}
                    onChange={(e) => {
                        setUserId(e.target.value);
                        setSelectedGroup("");
                        setSelectedGroupName("");
                        setGroupPermissions([]);
                    }}
                    options={userOptions}
                />
            </section>
        </aside>
    );
}