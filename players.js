const knex = require('knex')(require('./knexfile'))

module.exports = {
    get (clause) {
        console.log(`Getting where ${clause}`)
        return knex('players').where(clause)
            .select('*')
    }, // TODO be able to batch update players: There should be an edit roster button with no db changes until user hits submit.
    update (player_id, update) {
        console.log(`Updating ${player_id}`)
        return knex('players').where({ id: player_id })
            .update(update, ['id'])
    }
}