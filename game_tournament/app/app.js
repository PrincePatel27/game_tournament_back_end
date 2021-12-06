// Import express.js
const express = require("express");
//const { Scoreboard } = require("./models/scoreboard");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require('./services/db');

// Create a route for root - /
app.get("/", function(req, res) {
    res.send("Hello World");
});

// Get the models
const { Scoreboard } = require("./models/scoreboard");



// Create a route for testing the databse of games
app.get("/Point_Table", function(req, res) {
    var scoreboard = new Scoreboard();
    scoreboard.getScoreboard().then( 
        Promise => {
        res.send(scoreboard);
    });

});

// Create a route for testing the databse of games
app.get("/point", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from tournamentleaderboard';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});


// Get the models
//const { Scoreboard } = require("./models/scoreboard");




// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});