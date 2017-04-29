var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var _ = require("lodash");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var tablesData = [];



app.get("/", function(req, res){
	res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res){
	res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res){
	res.sendFile(path.join(__dirname, "reserve.html"));
});


app.get("/api/tables", function(req, res){
       return res.json(_.take(tablesData, 5));
});

app.get("/api/waitlist", function(req, res){
       return res.json(_.slice(tablesData, 5));
});


app.post("/api/tables", function(req, res){
	var newReservation = req.body;

	tablesData.push(newReservation);
	res.json(tablesData.length <=5);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});