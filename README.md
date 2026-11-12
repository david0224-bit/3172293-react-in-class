# ☕ Coffee Flavor in class

Sistema web de gestión administrativa para una cafetería. Permite administrar **usuarios, proveedores, inventario, productos y pedidos** desde un panel centralizado, con inicio de sesión mediante JWT y control de acceso por **grupos y permisos**.

Proyecto académico desarrollado por la ficha **3172293**.

---

## ✨ Características principales

- 🔐 **Autenticación** con JSON Web Tokens (JWT) y contraseñas cifradas con bcrypt.
- 🛡️ **Rutas protegidas** en frontend y backend.
- 👥 **Gestión de accesos:** grupos, permisos por módulo y asignación de permisos a cada grupo.
- 📋 **CRUD por módulos:** usuarios, proveedores, inventario, productos y pedidos.
- 🔄 **Activar/desactivar** usuarios y proveedores.
- 📊 **Reportes** de usuarios exportables a **PDF** y **Excel**.
- 🖼️ **Carga de imágenes** de usuario (multipart/form-data).
- 🔑 **Recuperación de contraseña** (recuperar, verificar código y restablecer).
- 🌗 **Tema claro/oscuro** con tablas, filtros y búsqueda.

---

## 🛠️ Tecnologías utilizadas

| Capa | Tecnologías |
|---|---|
| **Frontend** | React 19, Vite 8, React Router 7, Tailwind CSS 4, TanStack Table, Zod, SweetAlert2, Lucide React, jsPDF + jspdf-autotable, SheetJS (xlsx) |
| **Backend** | Node.js, Express 5, PostgreSQL (`pg`), JWT (`jsonwebtoken`), bcrypt, Joi, Multer, CORS, dotenv |
| **Base de datos** | PostgreSQL con migraciones SQL versionadas |

---

## 📁 Estructura del proyecto

```
3172293-coffee-flavor-project/
├── backend/
│   ├── database/
│   │   └── migrations/        # Scripts SQL numerados (0001 → 0034)
│   └── src/
│       ├── config/db.js       # Conexión a PostgreSQL (Pool)
│       ├── middlewares/       # Autenticación JWT y permisos
│       ├── features/          # Un módulo por entidad: routes → controller → service → repository
│       │   ├── auth/  users/  suppliers/  inventory/
│       │   └── products/  orders/  access/  groups/  permissions/
│       ├── app.js             # Configuración de Express y registro de rutas
│       └── server.js          # Arranque del servidor
└── frontend/
    ├── public/
    └── src/
        ├── app/               # App principal y enrutador
        ├── features/          # Páginas y lógica por módulo (users, order, inventory…)
        ├── shared/            # Componentes, layouts, contexto de tema y servicios comunes
        ├── services/          # Servicios para listas desplegables (selects)
        ├── styles/            # Tokens y estilos globales
        └── assets/            # Imágenes e íconos
```

---

## ✅ Requisitos previos

- [Node.js](https://nodejs.org/) 20 o superior y npm
- [PostgreSQL](https://www.postgresql.org/) 14 o superior
- Git

---

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Yellownight-bit/3172293-coffee-flavor-project.git
cd 3172293-coffee-flavor-project
```

### 2. Crear la base de datos

Crea una base de datos en PostgreSQL y ejecuta los scripts de `backend/database/migrations/` **en orden numérico** (0001, 0002, …, 0034):

```bash
createdb coffee_flavor
psql -d coffee_flavor -f backend/database/migrations/0001_create_user_table.sql
# …continúa con el resto de archivos en orden
```

> 💡 **Alternativa sin `psql`:** después de configurar `backend/.env` (paso 3), ejecuta `npm run migrate` dentro de `backend/`. El script crea la base de datos de `DB_NAME` si no existe y aplica en orden las migraciones pendientes. La migración `0015` asigna el usuario con `id = 1` al grupo Administrador, así que ese usuario debe existir antes de aplicarla (`npm run migrate -- 0014` aplica solo hasta la 0014).

### 3. Configurar y ejecutar el backend

```bash
cd backend
npm install
```

Crea un archivo `backend/.env` con las siguientes variables:

```env
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=coffee_flavor
JWT_SECRET=una_clave_secreta
JWT_EXPIRES=1h
```

Inicia el servidor:

```bash
npm run dev
```

La API quedará disponible en `http://localhost:4000/api`.

### 4. Configurar y ejecutar el frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

La aplicación abrirá en `http://localhost:5173`. La URL de la API se toma de `frontend/.env.development` (`VITE_API_URL=http://localhost:4000/api`).

> ⚠️ El backend solo acepta peticiones (CORS) desde `http://localhost:5173`. Si cambias el puerto del frontend, actualiza `backend/src/app.js`.

### Scripts disponibles

| Ubicación | Comando | Descripción |
|---|---|---|
| backend | `npm run dev` | Inicia el servidor Express |
| backend | `npm run migrate` | Aplica las migraciones SQL pendientes |
| frontend | `npm run dev` | Servidor de desarrollo de Vite |
| frontend | `npm run build` | Genera la versión de producción |
| frontend | `npm run preview` | Previsualiza el build |
| frontend | `npm run lint` | Revisa el código con ESLint |

---

## 💻 Uso

1. Ingresa a `http://localhost:5173`; serás redirigido a `/auth` para iniciar sesión.
2. Después de autenticarte, accede al **Dashboard** desde el menú lateral.
3. Gestiona cada módulo desde su listado:

| Módulo | Ruta |
|---|---|
| Usuarios | `/dashboard/userList` |
| Proveedores | `/dashboard/supplierList` |
| Inventario | `/dashboard/inventoryList` |
| Productos | `/dashboard/productList` |
| Pedidos | `/dashboard/orderList` |
| Accesos y permisos | `/dashboard/access` |

### Endpoints principales de la API

Todas las rutas usan el prefijo `/api`. Las rutas protegidas requieren el encabezado `Authorization: Bearer <token>`.

| Recurso | Endpoints |
|---|---|
| `/auth` | `POST /login` |
| `/users` | `GET /` · `POST /` · `PUT /:id` · `PATCH /:id` (estado) |
| `/suppliers` | `GET /` · `POST /` · `PUT /:id` · `PATCH /:id` (estado) |
| `/inventory` | `GET /` · `POST /` · `PUT /:id` |
| `/products` | `GET /` · `POST /` · `PUT /:id` |
| `/orders` | `GET /` · `POST /` · `PUT /:id` |
| `/groups` | `GET /` · `GET /:groupId/permissions` · `PUT /:groupId/permissions` |
| `/permissions` | `GET /` |
| `/access` | `GET /` |

📸 _[COMPLETAR: agregar capturas de pantalla del login y del dashboard]_

---

## 👨‍💻 Autores

Proyecto desarrollado por aprendices de la ficha **3172293**:

- David Suárez Valencia
- Jacobo Agudelo López
- Nicolás Echeverry
- Maycol Silva
- Dilan Estiven Gómez

_[COMPLETAR: roles de cada integrante, instructor y centro de formación]_

---

## 📄 Licencia

Distribuido bajo la licencia **MIT**. Consulta el archivo [`LICENSE`](frontend/LICENSE) para más información.
