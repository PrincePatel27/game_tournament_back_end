const db = require('../services/db');
class Teampoint {
    // Point ID
    id;
    // Tournament id is forieign key
    tournamentid;
    //Team id is foreign key
    teamid;
    //point
    point;
    //Is winner or not
    IsWinner;
    

    constructor(id) {
        this.id = id;
    }
    
    async getTeampointID() {
        
            var sql = "SELECT * from tournamentleaderboard"
            const results = await db.query(sql);
            this.id = results;
        
    }
    
    // async getStudentProgramme()  {
    // }
    
    // async getStudentModules() {
    // }
}

module.exports = {
    Teampoint
}