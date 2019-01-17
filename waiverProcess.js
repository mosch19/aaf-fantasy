const knex = require('knex')(require('./knexfile'))

/*
    Open the transacstions table, sort by time, and perform the actions one at a time. This script can be called by a chron job
*/