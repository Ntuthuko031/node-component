var express = require('express');
var router = express.Router();
const https = require("https");

let url = "https://c063-102-22-81-236.ngrok-free.app/comments";

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", { title: 'BlueBeetleTest' });

    https.get(url, (res) => {
        let body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                const template = "li UserId: #{userId} postId #{postId} comment #{comment}" ;
                json.forEach(function (table) {
                    var tableName = table.name;
                    res.render(template, table)
                });
                // do
            } catch (error) {
                console.error(error.message);
            };
        });

    }).on("error", (error) => {
        console.error(error.message);
    });

});





module.exports = router;