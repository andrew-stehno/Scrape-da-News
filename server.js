// Dependencies:
const express = require("express");
const exphbs  = require('express-handlebars');
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

// Require models folder:
const db = require("./models");

const PORT = process.env.PORT || 3000;

// Express:
const app = express();

// Middleware:
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars:
app.engine('handlebars', exphbs({
    defaultLayout: "main"
  }));
app.set('view engine', 'handlebars');

// Connect to MondoDb:
mongoose.connect("mongodb://localhost/scrapeDaNews", { useNewUrlParser: true });

// Require routes:
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });

  module.exports = app;