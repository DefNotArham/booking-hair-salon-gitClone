const router = require("express").Router();

// Require the User model in order to interact with the database
const Professional = require("../models/Professional.model");
const isLoggedIn = require("../middleware/isLoggedIn");

/**
 * @swagger
 * tags:
 *   - name: professionals
 *     description: App professionals
 */

/**
 * @swagger
 * /api/professionals/all:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *        - professionals
 *     summary: Get all professionals
 *     responses:
 *       200:
 *         description: A list of professionals.
 */
router.get("/all", isLoggedIn, async (req, res) => {
  try {
    const professionals = await Professional.find();
    return res.status(200).json(professionals);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: err.toString() });
  }
});

module.exports = router;
