const router = require("express").Router();
const authRoutes = require("./auth.routes");
const appointmentRoutes = require("./appointment.routes");
const professionalsRoutes = require("./professionals.routes");

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

module.exports = router;
