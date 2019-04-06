const knex = require('knex')
const path = require('path')
const transformer = require('knex-csv-transformer').transformer
const transformHeader = require('knex-csv-transformer').transfomerHeader

exports.seed = transformer.seed({
  table: 'players',
  file: path.join(__dirname, '../Data/aaf_player_data.csv'),
  transformers: [
    transformHeader('Name', 'name'),
    transformHeader('Position', 'position'),
    transformHeader('Team', 'team'),
    transformHeader('Height', 'height'),
    transformHeader('Weight', 'weight'),
    transformHeader('College', 'college'),
    transformHeader('Points total', 'points_total'),
    transformHeader('Points avg', 'points_average'),
    transformHeader('Points variance', 'points_variance')
  ]
})