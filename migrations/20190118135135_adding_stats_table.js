
exports.up = function(knex, Promise) {
    return knex.schema.createTable('stats', function(t) {
        t.integer('player_id').unsigned()
        t.foreign('player_id').references('players.id')
        t.integer('week')
        t.primary(['player_id', 'week'])
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
        t.integer('defense_points_allowed')
        t.integer('defense_yards_allowed')
        t.integer('defense_td').defaultTo(0)
        t.integer('defense_2pt').defaultTo(0)
        t.integer('defense_fumbles_recovered').defaultTo(0)
        t.integer('defense_interceptions').defaultTo(0)
        t.integer('defense_safeties').defaultTo(0)
        t.integer('defense_blocked_punts').defaultTo(0)
        t.integer('defense_sacks').defaultTo(0)
      })
};

exports.down = function(knex, Promise) {
  return Promise.all([
    //   knex.schema.dropTableIfExists('players'),
      knex.schema.dropTableIfExists('stats')
  ])
};
