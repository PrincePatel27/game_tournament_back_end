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
        var sql = `SELECT t.*,g.name as gameName from tournaments t
        LEFT JOIN games g ON g.id = t.gameId`;
        const results = await db.query(sql);
        return results;
    }

    async getTournamentTables() {
        var sql = `SELECT * FROM tournaments`;
        const results = await db.query(sql);
        if(results.length > 0) {
            for (const tr of results) {
                tr.leaderBoard = await this.getTournamentLeaderboard(tr.id);
            }
        }
        return results;
    }

    async getTournamentLeaderboard(id) {
        var sql = `SELECT tl.*,tt.name as teamName from  tournamentleaderboard tl
        LEFT JOIN tournamentteams tt ON tt.id = tl.teamId WHERE tl.tournamentId = ${id}`;
        return await db.query(sql);
    }
}
module.exports = {
    Tournament
}