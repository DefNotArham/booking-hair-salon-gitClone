const router = require("express").Router();

// Require the User model in order to interact with the database
const Appointment = require("../models/Appointment.model");
const Session = require("../models/Session.model")
const isLoggedIn = require("../middleware/isLoggedIn");

/**
 * @swagger
 * tags:
 *   - name: appointments
 *     description: App appointments
 */

/**
 * @swagger
 * /api/appointments/all:
 *   get:
 *     tags:
 *        - appointments
 *     summary: Get all appointments
 *     responses:
 *       200:
 *         description: A list of appointments.
 */
router.get("/all", isLoggedIn, async (req, res) => {
  const accessToken = req.headers.authorization;
  try {
    const session = await Session.findById(accessToken).populate("user");
    const appointments = await Appointment.find({
      user: { $eq: session.user._id },
    }).populate("professional");
    return res.status(200).json(appointments);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: err.toString() });
  }
});

/**
 * @swagger
 * /api/appointments/professional/:id :
 *   get:
 *     tags:
 *        - appointments
 *     summary: Get all appointments
 *     responses:
 *       200:
 *         description: A list of appointments.
 */
router.get("/professional/:id", isLoggedIn, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      professional: { $eq: req.params.id },
    }).populate("professional");
    return res.status(200).json(appointments);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ errorMessage: err.toString() });
  }
});

/**
 * @swagger
 * /api/appointments/ :
 *   post:
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
 *               date:
 *                 type: string
 *               hour:
 *                 type: string
 *               professionalId:
 *                 type: string
 *     responses:
 *       200:
 *         description: A list of appointments.
 */
router.post("/appointment", isLoggedIn, async (req, res) => {
  const accessToken = req.headers.authorization;
  try {
    const session = await Session.findById(accessToken).populate("user");
    const user = session.user;

    if (req.body.date && req.body.hour && req.body.professionalId) {
      const appointment = await Appointment.create({
        date: req.body.date,
        hour: req.body.hour,
        professional: req.body.professionalId,
        user: user._id,
      });
      return res.status(200).json(appointment);
    }  else {
      return res.status(400).json({ errorMessage: "Input data are invalid, should have: date, hour and professionalId" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.toString() });
  }
});

/**
 * @swagger
 * /api/appointments/:id :
 *   patch:
 *     tags:
 *        - appointments
 *     summary: Edit appointment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *               hour:
 *                 type: string
 *               professionalId:
 *                 type: string
 *     responses:
 *       200:
 *         description: A list of appointments.
 */
router.patch("/:id", isLoggedIn, async (req, res) => {
  try {
    const appointmentId = req.params.id;

    if (req.body.date && req.body.hour && req.body.professionalId) {
      const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
        date: req.body.date,
        hour: req.body.hour,
        professional: req.body.professionalId,
        user: user._id,
      });
      return res.status(200).json(appointment);
    } else {
      return res.status(400).json({ errorMessage: "Input data are invalid, should have: date, hour and professionalId" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errorMessage: err.toString() });
  }
});


/**
 * @swagger
 * /api/appointments/:id:
 *   delete:
 *     tags:
 *       - appointments
 *     summary: Delete appointment
 *     responses:
 *       200:
 *         description: if everything is going ok
 */
router.delete("/:id", isLoggedIn, (req, res) => {
  Appointment.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({ message: "Appointment was delete" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ errorMessage: err.message });
      });
});


module.exports = router;
