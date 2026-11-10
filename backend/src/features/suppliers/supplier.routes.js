import { Router } from "express";
import { supplierController } from "./supplier.controller.js";
import { authenticateToken } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/", supplierController.create);

router.get(
  "/",
  authenticateToken,
  supplierController.getAll
);

router.put(
  "/:id",
  authenticateToken,
  supplierController.update
);

router.patch(
  "/:id",
  authenticateToken,
  supplierController.updateStatus
);

export default router;