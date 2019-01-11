
exports.up = function(knex, Promise) {
  return knex.schema.table('user', function(t) {
      t.unique(['team_name'])
  })
};

exports.down = function(knex, Promise) {
  
};
