var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

// tell node to use EJS files
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));

var movies = []

app.get('/movies/', function(req, res) {
	res.render('movies/index')
})

app.get('/movies/search', function(req, res) {
	var searchTerm = req.query.title;
	console.log(searchTerm)

	request("http://www.omdbapi.com/?s=" + searchTerm, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var stuff = JSON.parse(body);
			//res.send(stuff) //outputs the JSON file w/ the Search array
			res.render('movies/search', stuff)
  		} else {
      // res.render("errorPage")
      	console.log("ERRR000R");
  		}
	})
})

app.get('/movies/:imdbID', function(req, res) {
	var movieId = req.params.imdbID

	request("http://www.omdbapi.com/?i=" + movieId + "&tomatoes=true&", function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var stuff = JSON.parse(body);
			//res.send(stuff)
			console.log(stuff)
			res.render('movies/show', stuff)
  		} else {
      // res.render("errorPage")
      	console.log("ERRR000R");
  		}

	})
})

app.listen(3000);
