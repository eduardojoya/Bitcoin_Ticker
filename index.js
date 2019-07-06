//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    // console.log(req.body.crypto);
    var crypto = req.body.crypto;
    var currency = req.body.currency;
    var amount = req.body.amount;

    // var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
    var baseURL = "https://apiv2.bitcoinaverage.com/convert/global"

    // var finalURL = baseURL + crypto + currency;

    var options = {
        url: baseURL,
        method: "GET",
        qs: {
            from: crypto,
            to: currency,
            amount: amount,
        }
    }

    // request(finalURL, function (error, response, body) 
    request(options, function (error, response, body) {

        var data = JSON.parse(body); //converts JSON to a JS object
        // var price = data.last
        var price = data.price;
        console.log(price)

        // var currentDate = data.display_timestamp
        var currentDate = data.time


        res.write("<p>The current date is " + currentDate + "</p>");

        res.write("<h1>" + amount + crypto + " is currently worth " + price + currency + "</h1>");

        res.send();
    });
});



app.listen(3000, function () {
    console.log("Server is running on port 3000;")
});