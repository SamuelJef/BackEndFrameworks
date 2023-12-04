const express = require("express");
const cors = require("cors");
const routes = require("./routes.js");
require("./mongodb/mongodb.js")

// Initialize Express and define middleware
const app = express();
app.use(cors()); // Allow access from any domain
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

module.exports = app;
