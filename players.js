const knex = require('knex')(require('./knexfile'))

module.exports = {
    getPlayersByPosition (position) {
        console.log(`Querying for ${position}`)
        return knex('players').where({ position })
            .select('*')
    },
    getOwner ({ player_id }) {
        return knex('players').where({ id: player_id })
            .select('owner_id')
    },
    addOwner ({ owner_id, player_id }) {
        return knex('players').where({ id: player_id })
            .update({ owner_id, owner_id }, ['id'])
    }
}