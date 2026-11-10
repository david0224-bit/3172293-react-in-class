// ./features/users/user.routes.js
// Agregar multer para procesar FormData

import { Router } from "express";
import multer from "multer";
import { userController } from "./user.controller.js";
import { authenticateToken } from "../../middlewares/auth.middleware.js";

const router = Router();
const upload = multer({ dest: "uploads/" }); // o config más avanzada

// quí se procesa multipart/form-data
router.post(
  "/",
  authenticateToken,
  upload.array("userImage"),
  userController.create,
);

router.get(
  "/",
  authenticateToken,
  userController.getAll,
);

router.put(
  "/:id",
  authenticateToken,
  userController.update,
);

router.patch(
    "/:id",
    userController.updateStatus,
);

export default router;
