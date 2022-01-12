const db = require('../services/db');
class TournamentTeams {
    // Tournament team ID
    id;
    // Tournamnet id is foreign key
    tournamentId;
    //name 
    name;
    //Tournamnet team description
    description;
    

    constructor(tournamentId) {
        this.tournamentId = tournamentId;
    }
    
    async getTournamentMatches(tournamentId){
        if (this.tournamentId !== null) {
            var sql = "SELECT * from tournamentteams where tournamentId ="+ tournamentId;
            const results = await db.query(sql);
            this.tournamentId = results;          
        }
    }
}
module.exports = {
    TournamentTeams

}