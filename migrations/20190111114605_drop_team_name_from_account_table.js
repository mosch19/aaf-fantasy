
exports.up = function(knex, Promise) {
  return knex.schema.table('user', function (t) {
    t.dropColumn('team_name')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('user', function (t) {
    t.string('team_name').notNullable()
  })
};
