let db = require("../models");

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.render("index");
    });
  
    app.get("/scrape", function (app) {
      res.json();
    });

    // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};