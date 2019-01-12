const express = require('express')
const bodyParser = require('body-parser')
const account = require('./account')
const team = require('./team')
const players = require('./players')
const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())

app.post('/createUser', (req, res) => {
    account
      .createUser({
        username: req.body.username,
        password: req.body.password
      })
      .then(user_id => {
        return team
          .createTeam({
            user_id: user_id,
            team_name: req.body.team_name
          })
      })
      .then(team => {
        if (!team) res.sendStatus(400)
        else res.sendStatus(200)
      })
      .catch(e => res.status(400).json(e.message))
  })
  app.post('/login', (req, res) => {
    account
      .authenticate({
        username: req.body.username,
        password: req.body.password
      })
      .then(({success}) => {
        if (success) res.sendStatus(200)
        else res.sendStatus(401)
      })
  })
  app.post('/updateTeamName', (req, res, next) => {
    account
      .getUserId({
        username: req.body.username
      })
      .then(user_array => {
        const user_id = user_array[0].id
        return team.updateTeamName({
          user_id,
          team_name: req.body.team_name
        })
      })
      .then(() => {
        res.sendStatus(200)
      })
      .catch(e => res.status(400).json(e.message))
  })
  app.post('/addPlayer', (req, res, next) => {
    players
      .getOwner({
        player_id: req.body.player_id
      })
      .then(response => {
        const current_owner_id = response[0].owner_id
        if (current_owner_id != null) throw 'Player already owned'
        return players.addOwner({
          owner_id: req.body.owner_id,
          player_id: req.body.player_id
        })
      })
      .then(player_id => {
        res.sendStatus(200)
      })
      .catch(e => res.status(400).json({ error: e }))
  })
  app.post('/dropPlayer', (req, res, next) => {
    players
      .getOwner({
        player_id: req.body.player_id
      })
      .then(response => {
        const current_owner_id = response[0].owner_id
        if (current_owner_id === null) throw 'Player is not owned'
        return players.dropOwner({
          owner_id: req.body.owner_id,
          player_id: req.body.player_id
        })
      })
      .then(player_id => {
        res.sendStatus(200)
      })
      .catch(e => res.status(400).json({ error: e }))
  })
  app.get('/players/:position', (req, res, next) => {
    players
      .getPlayersByPosition(
        req.params.position
      )
      .then(players_array => {
        res.status(200).send(players_array)
      })
      .catch(e => res.status(400).json(e.message))
  })
  app.get('/roster/:owner', (req, res, next) => {
    players.getPlayersByOwner(
      req.params.owner
    )
    .then(players_array => {
      res.status(200).send(players_array)
    })
    .catch(e => res.status(400).json(e.message))
  })

  app.listen(7555, () => {
    console.log('Server running on http://localhost:7555')
  })
