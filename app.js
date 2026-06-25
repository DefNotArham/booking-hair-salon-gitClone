// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv

import dotenv from "dotenv";

// ℹ️ Connects to the database

import db from "./db";

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Booking Hair Salon Backend Documentation",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*"], // files containing annotations as above
};
const swaggerSpec = swaggerJsdoc(options);

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
