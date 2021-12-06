const db = require('../services/db');
class Scoreboard {
    // Scoreboard ID
    id;
    

    constructor(id) {
        this.id = id;
    }
    
    async getScoreboard() {
        if (typeof this.name !== 'string') {
            var sql = "SELECT * from tournamentleaderboard where id = ?"
            const results = await db.query(sql, [this.id]);
            this.name = results[0].name;
        }
    }
    
    // async getStudentProgramme()  {
    // }
    
    // async getStudentModules() {
    // }
}

module.exports = {
    Scoreboard
}
