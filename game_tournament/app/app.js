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

// Create a route for root - /
app.get("/", async function(req, res) {
    const game = new Game();
    var tournament=new Tournament();
    const tournaments = await tournament.getTournamentName();
    const games = await game.getGameName();
    const tournamentLeaderboard = await tournament.getTournamentTables();
    console.log(tournamentLeaderboard.length)
    res.render("index",{games,tournaments,tournamentLeaderboard});

});
app.get("/Home", function(req, res) {
    res.render("index");

});
app.get("/Profile", function(req, res) {
    res.render("profile");
});
app.get("/Signup", function(req, res) {
    res.render("signup");
});
app.get("/Login", function(req, res) {
    res.render("login");
});

app.get("/Forgot", function(req, res) {
    res.render("forget");
});

// Create a route for testing the databse of games
app.get("/game_table", async function(req, res) {
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