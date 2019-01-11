
exports.up = function(knex, Promise) {
  return knex.schema.createTable('players', function(t) {
      t.increments('id').primary()
      t.string('name').notNullable()
      t.string('position').notNullable()
      t.string('team').notNullable()
      t.integer('owner_id').unsigned()
      t.foreign('owner_id').references('teams.id')
      t.string('height')
      t.string('weight')
      t.string('college')
      t.float('points_total')
      t.float('points_average')
      t.float('points_variance')
      t.integer('pass_td').unsigned().defaultTo(0)
      t.integer('pass_2pt').unsigned().defaultTo(0)
      t.integer('pass_yards').defaultTo(0)
      t.integer('pass_interceptions').unsigned().defaultTo(0)
      t.integer('rush_td').unsigned().defaultTo(0)
      t.integer('rush_2pt').unsigned().defaultTo(0)
      t.integer('rush_yards').defaultTo(0)
      t.integer('receiving_td').unsigned().defaultTo(0)
      t.integer('receiving_2pt').unsigned().defaultTo(0)
      t.integer('receiving_yards').defaultTo(0)
      t.integer('receiving_receptions').unsigned().defaultTo(0)
      t.integer('punting_inside_10').unsigned().defaultTo(0)
      t.integer('punting_inside_20').unsigned().defaultTo(0)
      t.integer('punting_fair_catches').unsigned().defaultTo(0)
      t.integer('punting_touchbacks').unsigned().defaultTo(0)
      t.integer('punting_blocked').unsigned().defaultTo(0)
      t.integer('punting_td_returned').unsigned().defaultTo(0)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('players')
};
