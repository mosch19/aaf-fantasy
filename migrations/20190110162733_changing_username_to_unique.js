
exports.up = function(knex, Promise) {
    return knex.schema.table('user', function(t) {
        t.unique(['username'])
    })
};

exports.down = function(knex, Promise) {
  
};
