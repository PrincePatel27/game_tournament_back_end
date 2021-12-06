const db = require('../services/db');
class Game {
    // Game ID
    id;
    // Game name
    name;
    // Game type
    type;
    constructor(name) {
        this.name = name;
    }
    async getGameName() {
        if (typeof this.name !== 'string') {
            var sql = "SELECT name from games";
            const results = await db.query(sql);
            this.name = results;          
        }
    }
}
module.exports = {
    Game
}