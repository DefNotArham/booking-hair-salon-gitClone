import express from "express";

const router = express.Router();

import authRoutes from "./auth.routes.js";
import appointmentRoutes from "./appointment.routes.js";
import professionalsRoutes from "./professionals.routes.js";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:            # arbitrary name for the security scheme
 *        type: apiKey
 *        name: Authorization
 *        in: header
 *
 *
 * security:
 *   - bearerAuth: []
 */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/professionals", professionalsRoutes);

export default router;
