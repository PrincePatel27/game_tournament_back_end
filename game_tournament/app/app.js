// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require('./services/db');
// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Get the game models
const { Game } = require("./models/game");

// Get the game models
const { Tournament } = require("./models/tournament");
const { Teampoint } = require("./models/teampoint");
const {TournamentTeams} = require("./models/tournamentTeams")
// Create a route for root - /
app.get("/", function(req, res) {
    res.render("index");

});

// Create a route for testing the databse of games
app.get("/game_table", function(req, res) {
    var game=new Game();
    game.getGameName().then( 
        Promise => {
        res.send(game);
    });
});

// Create a route for testing the databse of games
app.get("/games1", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select name from games';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});

// Create a route for testing the databse of 
app.get("/points", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from tournamentleaderboard';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});

//Create a route for testing the databse of games
app.get("/point_table", function(req, res) {
    var point=new Teampoint();
    point.getTeampointID().then( 
        Promise => {
        res.send(point);
    });
});



// Create a route for testing the databse of games
app.get("/tournament_table", function(req, res) {
    var tournament=new Tournament();
    tournament.getTournamentName().then( 
        Promise => {
        res.send(tournament);
    });
});
app.get("/tournament_matches", function(req, res) {
    console.log(req.query.id)
    var tournamentTeams=new TournamentTeams();
    tournamentTeams.getTournamentMatches(req.query.id).then( 
        Promise => {
        res.send(tournamentTeams);
    });
});
// Create a route for testing the databse of games
app.get("/tournament", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select name,description,time date, venue ,status from tournaments';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});




// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});