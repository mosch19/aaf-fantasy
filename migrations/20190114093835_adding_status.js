
exports.up = function(knex, Promise) {
  return knex.schema.table('players', function(t) {
    t.boolean('active').notNullable().defaultTo(false)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('players', function(t) {
      t.dropColumn('active')
  })
};
