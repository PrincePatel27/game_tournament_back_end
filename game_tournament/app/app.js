// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require('./services/db');

// Get the models
const { Game } = require("./models/game");

// Create a route for testing the databse of games
app.get("/games_table", function(req, res) {
    var game=new Game();
    game.getGameName().then( 
        Promise => {
        res.send(game);
    });
});

// Create a route for testing the databse of games
app.get("/games_1", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select name from games';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
        res.render('games', {games:results});
    });
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});