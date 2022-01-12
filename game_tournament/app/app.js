// Import express.js
const express = require("express");
// Create express app
var app = express();
const session = require('express-session');
const path = require('path')
const bodyParser = require('body-parser');
app.use(session({
    secret: 'gametournament',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(bodyParser.urlencoded({ extended: false }))
// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require('./services/db');

// Use the Pug templating engine
app.use('/views', express.static(path.resolve(__dirname, './views')))
app.set('view engine', 'pug');
app.set('views', './app/views');

// Get the models
const { Game } = require("./models/game");
const { Tournament } = require("./models/tournament");
const { Teampoint } = require("./models/teampoint");
const { User } = require("./models/user");
const {TournamentTeams} = require("./models/tournamentteams");

// Create a route for root - /
app.get("/", async function(req, res) {
    /*const game = new Game();
    var tournament=new Tournament();
    const tournaments = await tournament.getTournamentName();
    const games = await game.getGameName();
    const tournamentLeaderboard = await tournament.getTournamentTables();
    console.log(tournamentLeaderboard.length)
    res.render("index",{games,tournaments,tournamentLeaderboard});*/
    if (req.session.uid) {
        const game = new Game();
        var tournament = new Tournament();
        const tournaments = await tournament.getTournamentName();
        const games = await game.getGameName();
        const tournamentLeaderboard = await tournament.getTournamentTables();
        console.log(tournamentLeaderboard.length)
        res.render("index", { games, tournaments, tournamentLeaderboard });
        
    } else {
        res.send('Please login to view this page!');
    }
    res.end();

});
app.get("/Home", function(req, res) {
    if (req.session.uid) {
        res.render("index.pug");
    } else {
        res.send('Please login to view this page!');
    }
});
app.get("/Signup", function(req, res) {
    res.render("signup.pug");
});
app.get("/Login", function(req, res) {
    res.render("login.pug");
});

app.get("/Forgot", async function(req, res) {
    const game = new Game();
    const games = await game.getGameName();
    res.render("forget.pug",{games});
});
app.get("/profile", async function (req, res) {
    if (req.session.uid) {
        const game = new Game();
        const games = await game.getGameName();
        const userId = req.session.uid;
        const user = new User();
        //const userDetail = await user.getUserDetail(userId);
        res.render('profile.pug', { userId, games });
    } else {
        res.render("requireLogin");
    }
});
//edit profile
app.post("/changeProfile", async function (req, res) {
   // if (req.session.uid) {
        params = req.body;
        var user = new User();
        const profileInsert = await user.changeProfile(params, req.session.uid.id);
        if (profileInsert) {
            res.redirect('/');
        }
    //} else {
       // res.render("requireLogin");
   // }
});


//registration
app.post('/signup', async function(req,res){
    params = req.body;
    var user =new User();
    await user.addUser(params);
    res.render('register-success.pug');
});
//login
app.post('/login', async function (req, res) {
    params = req.body;
    var user = new User();
    const data = await user.login(params);
    if (data.isAuthorized) {
       
        req.session.uid = data.user;
        req.session.loggedIn = true;
        res.redirect('/');
    } else {
        res.send('Email or password is incorrect');
    }
});

// Logout
app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/login');
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
