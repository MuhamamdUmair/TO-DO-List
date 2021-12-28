//jshint esversion:6
const express = require("express");

const bodyParser = require("body-parser");

const getDate = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extented: true
}));

app.use(express.static("public"));
// New list items storage
const items = ["Buy Food", "Cook Food", "Eat Food"];

const workitems = [];

app.get("/", function(req, res) {

  const date = getDate.requiredDate();

  res.render("list", {
    listTitle: date,
    newlistItems: items
  });

});

app.post("/", function(req, res) {

  const item = req.body.newInput;

  if (req.body.list == "Work") {

    workitems.push(item);

    res.redirect("/work");

  } else {
    items.push(item);

    res.redirect("/");

  }

});

app.get("/work", function(req, res) {

  res.render("list", {
    listTitle: 'Work List',
    newlistItems: workitems
  });

});

app.get("/about", function(req, res) {

  res.render("about");

});
app.listen(process.env.PORT || 3000, function() {

  console.log("Our server is running at port 3000");

});
