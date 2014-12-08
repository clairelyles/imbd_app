var express = require('express');
var bodyParser = require('body-parser');
var db = require("./models/index.js");
var request = require('request');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));


// ------------- renders index ------------- //

app.get('/', function(req, res) {
	res.render('index')
})

// ------------- renders search page ------------- //

app.get('/search', function(req, res) {
	var searchTerm = req.query.title;
	console.log(searchTerm)

	request("http://www.omdbapi.com/?s=" + searchTerm, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var stuff = JSON.parse(body);
			//res.send(stuff) //outputs the JSON file w/ the Search array
			res.render('search', stuff)
  		} else {
      // res.render("errorPage")
      	console.log("ERRR000R");
  		}
	})
})

// ------------- renders show page ------------- //

app.get('/:imdbID', function(req, res) {
	var movieId = req.params.imdbID

	request("http://www.omdbapi.com/?i=" + movieId + "&tomatoes=true&", function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var stuff = JSON.parse(body);
			//res.send(stuff)
			//console.log(stuff)
			res.render('show', stuff)
  		} else {
      // res.render("errorPage")
      	console.log("ERRR000R");
  		}
	})
})

// ------------- posts to watch list & creates new row in db ------------- //

app.post('/watchlist', function(req, res) {
	var myObject = req.body;
	//console.log(myObject);

	db.Queue.findOrCreate({where: {imbd_code: req.body.imdb_code, title: req.body.title, year: req.body.year }}).done(function(err,data,noCreated) {
		db.Queue.findAll().done(function(err, data2) {
		// Q for class: why is the array ordered not according to db id#?
		//res.send({dataArray:data2})
		res.render("watchlist", {dataArray: data2})
		})
	})
})

// ------------- not working: removes from watch list ------------- //

app.post('/watchlist', function(req, res) {
	db.Queue.find({where: {imbd_code: req.body.imdb_code, title: req.body.title, year: req.body.year }}).then(function(row) {
		row.destroy().success(function(err, data3) {
			res.render("watchlist", {dataArray: data3})
		})
	})
})

// last step: how do I link to the queue list? Unable to do the app.get since we're not sending anything over from the hidden input form fields?

app.listen(3000);
