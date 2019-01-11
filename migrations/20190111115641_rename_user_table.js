
exports.up = function(knex, Promise) {
  return knex.schema.renameTable('user', 'users')
};

exports.down = function(knex, Promise) {
    return knex.schema.renameTable('users', 'user')
};
