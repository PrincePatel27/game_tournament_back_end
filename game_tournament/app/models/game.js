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
        var sql = "SELECT * from games";
        const results = await db.query(sql);
        return results;
    }
}
module.exports = {
    Game
}