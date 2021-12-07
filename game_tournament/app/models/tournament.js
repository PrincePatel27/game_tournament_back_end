const db = require('../services/db');
class Tournament {
    // Tournament ID
    id;
    // Tournamnet name
    name;
    //game id is foreign key
    gameid;
    //Tournamnet description
    description;
    //tournamnet time 
    time;
    //tournament date
    date;
    //tournament venue online or offline
    venue;
    //tournament availblity
    status;

    constructor(name) {
        this.name = name;
    }
    async getTournamentName() {
        if (typeof this.name !== 'string') {
            var sql = "SELECT name,description,time date, venue ,status from tournaments";
            const results = await db.query(sql);
            this.name = results;          
        }
    }
}
module.exports = {
    Tournament
}