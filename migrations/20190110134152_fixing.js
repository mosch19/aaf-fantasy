
exports.up = function(knex, Promise) {
    return knex.schema.table('user', function(t) {
        t.renameColumn('user', 'username')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('user')
  };