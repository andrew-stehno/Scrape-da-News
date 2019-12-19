let db = require("../models");

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.render("index");
    });
  
    // app.get("/all", function (app) {
    //   db.Article.find({}).then(function(dbArticle) {
    //     const hbsObj = {
    //       articles: dbArticle
    //     };
    //     res.render("all", hbsObj);
    //   });
    // });

    // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};