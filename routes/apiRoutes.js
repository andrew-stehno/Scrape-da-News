const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function(app) {
    app.get("/scrape", function(req, res) {
        axios.get("https://www.nps.gov/index.htm").then(function(response) {
            let $ = cheerio.load(response.data);
        // console.log(response.data);
            $(".Component").each(function(i, element) {
                let result = {};
                result.image = "https://www.nps.gov" + $(this)
                .children()
                .children()
                .children(".Feature-image")
                .attr("src");
                result.imageAlt = $(this)
                .children()
                .children()
                .children(".Feature-image")
                .attr("alt");
                result.title = $(this)
                .children()
                .children()
                .children(".Feature-title")
                .text();
                result.link = "https://www.nps.gov" + $(this)
                .children("a")
                .attr("href");
                result.summary = $(this)
                .children(".Feature-description")
                .text();
                console.log(result);
                db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    console.log(err);
                })
            })
            res.send("Scrape Complete");
        })
    })

    app.get("/", function(req, res) {
        db.Article.find({})
          .then(function(dbArticle) {
            const hbsObj = {
          articles: dbArticle
        };
        res.render("index", hbsObj);
          })
          .catch(function(err) {
            res.json(err);
          });
      });

      app.get("/articles/:id", (req, res) => {
          db.Article.findOne({_id: req.params.id})
          .populate("note")
          .then((dbArticle) => {
              res.json(dbArticle);
          })
          .catch(err => res.json(err));
      })
};
