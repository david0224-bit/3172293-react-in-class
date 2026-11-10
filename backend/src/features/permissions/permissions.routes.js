// backend/src/features/permissions/permissions.routes.js
import { Router } from "express";
import { permissionController } from "./permissions.controller.js";

const router = Router();

router.get("/", permissionController.getAll);

export default router;