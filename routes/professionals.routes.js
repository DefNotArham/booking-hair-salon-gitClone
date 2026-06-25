import express from "express";

const router = express.Router();

// Require the User model in order to interact with the database

import Professional from "../models/Professional.model.js";
import isLoggedIn from "../middleware/isLoggedIn.js";
import Session from "../models/Session.model.js";
import Appointment from "../models/Appointment.model.js";

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

/**
 * @swagger
 * /api/appointments/ :
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *        - appointments
 *     summary: Create new appointment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastName:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *                 description:
 *                 type: string
 *     responses:
 *       200:
 *         description: A list of appointments.
 */
router.post("/", isLoggedIn, async (req, res) => {
  try {
    if (
      req.body.name &&
      req.body.lastName &&
      req.body.imageUrl &&
      req.body.description
    ) {
      const appointment = await Professional.create({
        name: req.body.name,
        lastName: req.body.lastName,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
      });
      return res.status(200).json(appointment);
    } else {
      return res.status(400).json({
        errorMessage:
          "Input data are invalid, should have: name, lastName and description",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.toString() });
  }
});

export default router;
