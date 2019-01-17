const knex = require('knex')(require('./knexfile'))

module.exports = {
    get (clause) {
        console.log(`Getting team where ${clause}`)
        return knex('teams').where(clause)
            .select('*')
    },
    createTeam ({ user_id, team_name }) {
        return knex('teams').insert({
            user_id: user_id,
            team_name: team_name
        })
    },
    updateTeamName ({ user_id, team_name }) {
        return knex('teams').where({ user_id })
            .update({ team_name: team_name }, ['id'])
    }
}