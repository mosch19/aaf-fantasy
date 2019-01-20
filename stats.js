const knex = require('knex')(require('./knexfile'))

module.exports = {
    get (player_ids) {
        // console.log(player_id)
        return knex.select('*').from('stats')
            .leftJoin('players', 'stats.player_id', 'players.id')
            .where({ player_id: 10 })
    }
}