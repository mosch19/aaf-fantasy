
exports.up = async function(knex, Promise) {
  await knex.schema.table('user', function(t) {
      t.string('team_name').notNullable().unique()
  })
  const users = await knex('user')
  await Promise.all(users.map(addTeamName))
  function addTeamName (user) {
      return knex('user')
        .where({ id: user.id })
        .update({ team_name: "Team" + user.id })
  }
};

exports.down = function(knex, Promise) {
  
};
