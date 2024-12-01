var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var path = require("path");

var model = require("./model/model.js");

var app = express();

app.use(cors());

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/favicon.ico", function(req, res){
  res.status(204);
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/sites.html"));
});

app.get("/sites", function (req, res) {
  model.GetSites(req,res);
});

app.get("/getDailyStats", function (req, res) {
  model.GetDailyStats(req,res);
});

app.get("/stats", function (req, res) {
  model.GetStats(req,res);
});

app.post("/weatherData", function (req, res) {
  var data = req.body;
  model.GetWeatherData(req,res,data);
});

app.post("/sitesOnMap", function (req, res) {
  var data = req.body;
  model.GetSitesonMap(req,res,data);
});

app.post("/updateSite", function (req, res) {
  var data = req.body;
  model.UpdateSite(req,res,data);
});

app.post("/DailyStats", function (req, res) {
  var data = req.body;
  model.DailyStats(req,res,data);
});



var myServer = app.listen(3000, function () {
  console.log("Server listening on port 3000");
});
