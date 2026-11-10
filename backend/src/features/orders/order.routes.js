import { Router } from "express";
import { orderController } from "./order.controller.js";
import { authenticateToken } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/", orderController.create);
router.get("/", authenticateToken, orderController.getAll);
router.put("/:id", authenticateToken, orderController.update);

export default router;