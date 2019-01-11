const knex = require('knex')(require('./knexfile'))

module.exports = {
    getPlayersByPosition (position) {
        console.log(`Querying for ${position}`)
        return knex('players').where({ position })
            .select('*')
    }
}