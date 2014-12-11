var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var app = express();

var db = require("./models/index.js");

// install express session from npm
// https://www.npmjs.com/package/express-session
// set the session with app.use(session......)
// in the route add:
// req.session.lastPage = "/search?title="+searchRes <-- which came from the search term the user initially searches with

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(bodyParser.urlencoded({extended: false}));


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

// ------------- posts to watch list & creates new row in db ------------- //

app.post('/:id', function(req, res) {
	var myObject = req.body || false;
	//res.render("watchlist" + false)

	db.queue.findOrCreate({where: {imbd_code: req.body.imdb_code, title: req.body.title, year: req.body.year }}).then(function(err,data,Created) {
		res.send({data: data})
		}).catch(function(err) {
			if (err) throw err;
	})
})


// -------------  ajax creates list of items in watchlist ------------- //

app.get('/watchlist', function(req, res) {

		db.queue.findAll({order:'id ASC'}).done(function(err, data2) {
		//res.send({dataArray:data2})
		res.render("watchlist", {dataArray: data2})
		})
	})


// ------------- Comment button post ------------- //

// goal is to create a route that redirects you to /comment page  
app.post("/watchlist/:id/comments", function(req, res) {
	// res.send(req.body.comment);
	db.queue.find({where: {id: req.params.id}}).then(function(movieData) {
		movieData.createFinal({content: req.body.content}).then(function(theComment) {
			res.redirect("comments");
		})
	})
})


// ------------- Renders comment page from show page ------------- //

// goal is to create a route that redirects you to /comment page  
app.get("/watchlist/:id/comments", function(req,res) {
	var queue_id = req.params.id;
	db.queue.find({where: {"id":queue_id}}).then(function(queueMovie) {
		db.final.findAll({where: {"queueId": queue_id}}).then(function(returnedMovie) {
			// res.send(queueMovie)
			// res.send({returnedMovie:returnedMovie, queue_id:queue_id})
			res.render("comments", {"queueId": queue_id, "returnedMovie":returnedMovie, "queueMovie":queueMovie})
		})
	})
})



// ------------- ajax removes from watch list ------------- //

app.delete('/watchlist/:id', function(req, res) {
	db.queue.destroy({where:{id: req.params.id}}).then(function(deleteCount) {
		res.send({deleted: deleteCount})
	})
})

// ------------- renders show page ------------- //

app.get('/:imdbID', function(req, res) {
	var movieId = req.params.imdbID

	request("http://www.omdbapi.com/?i=" + movieId + "&tomatoes=true&", function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var movieItem = JSON.parse(body);
			//res.send(movieItem)
			db.queue.count({where: {imbd_code:movieItem.imdbID}}).then(function(foundItemCount) {
				// 
				var wasFound = foundItemCount > 0;
				var locals = {
					movieFound: wasFound,
					movieItem: movieItem,
				}
				res.render('show', locals);
				})
  		} else {
      	// res.render("errorPage")
      	console.log("ERRR000R");
  		}
	})
})

app.listen(3000);
