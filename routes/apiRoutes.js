const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function(app) {
    app.get("/scrape", function(req, res) {
        axios.get("https://www.nps.gov/index.htm").then(function(response) {
            let $ = cheerio.load(response.data);
        // console.log(response.data);
            $(".Feature-title").each(function(i, element) {
                let result = {};
                result.title = $(this)
                .text();
                result.link = "https://www.nps.gov" + $(this)
                .parent().parent("a")
                .attr("href");
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
};