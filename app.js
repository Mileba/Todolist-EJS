// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

const port = 3001;

let items = ["List 1", "List 2", "List 3"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let newDate = new Date();
    let today = newDate.toLocaleString("en-US", options);
    res.render("list", {
        date: today,
        itemLists:items
    });
});
app.post("/", function (req, res) {
    let item = req.body.newList;
    items.push(item);
    res.redirect("/");
});

app.listen(process.env.PORT || port, function () {
    console.log(`Server Started on port ${port}`);
});