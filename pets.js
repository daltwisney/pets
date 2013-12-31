
var express = require("express"),
	mongoose = require("mongoose"),
	jade = require("jade"),
	fs = require("fs"),
	file = __dirname + "/public/models/pets";

var app = express();

var pets = require(file).animals;
console.log("debug: " + pets);

// var pets = [
// 	    {	pet: "rocky", name: "Rocky the Wonder Beagle", animal: "dog"},
// 	    {	pet: "bailey", name: "Bailey aka Bailey Bean aka Chunky Butt", animal: "cat"},
// 	    {	pet: "little girl", name: "The Little Girl aka Tigerlilly", animal: "cat"} ,
// 	     {	pet: "annie", name: "The Big Doodle", animal: "dog"}
// ];

app.use(express.bodyParser());

//  get
app.get("/", function(req, res){
	res.json(pets);
});

// get  
app.get("/pets", function(req, res){
	res.json(pets);
});

// get by id
app.get("/pets/:id", function(req, res){
	if(pets.length <= req.params.id || req.params.id < 0) {
	    res.statusCode = 404;
	    return res.send("Error 404: No such four footer found");
	}

	var p = pets[req.params.id];
	return res.json(p);
});

// delete
app.delete("/pets/:id", function(req, res){
	if ( pets.length <= req.params.id){
		res.statusCode = 404;
		return res.send("Error 404: No such four footer found");
	}

	pets.splice(req.params.id, 1);
	res.json(true);
});

// create
app.post("/pets", function(req, res){
	if (!req.body.hasOwnProperty("pet") || 
		!req.body.hasOwnProperty("name") ||
		!req.body.hasOwnProperty("animal")) {
		res.statusCode = 400;
		return res.send("Error 400: Typo?")
	}

	var newPet = { pet: req.body.pet, 
		       name: req.body.name, 
		       animal: req.body.animal
	};

	pets.push(newPet);
	res.json(true);
});

app.listen( 33221);

