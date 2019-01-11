
exports.up = function(knex, Promise) {
  return knex.schema.createTable('teams', function(t) {
      t.increments('id').primary()
      t.string('team_name').notNullable()
      t.integer('wins').unsigned().defaultTo(0)
      t.integer('losses').unsigned().defaultTo(0)
      t.integer('user_id').unsigned()
      t.foreign('user_id').references('user.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('teams')
};
