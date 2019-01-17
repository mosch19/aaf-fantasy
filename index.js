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
      .then(user_id => {
        console.log(user_id)
        return team.get({ user_id })
      })
      .then(team => {
        res.status(200).json(team[0])
      })
      .catch(e => {
        console.log(e)
        res.status(401).json(e.message)
      })
  })
  app.put('/updateTeamName', (req, res, next) => {
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
  app.get('/teams', (req, res, next) => {
    team
      .get(req.query)
      .then(team_array => {
        res.status(200).send(team_array)
      })
      .catch(e => res.status(400).json(e.message))
  })
  app.get('/players', (req, res, next) => {
    players
      .get(req.query)
      .then(players_array => {
        res.status(200).send(players_array)
      })
      .catch(e => res.status(400).json(e.message))
  }) // TODO need to deactivate player on drop
  app.put('/playerTransaction', (req, res, next) => {
    const player_id = req.body.player_id
    players
      .get({ id: player_id })
      .then(response => {
        const player =response[0]
        const owner = parseInt(req.body.owner_id)
        const currentOwner = response[0].owner_id
        console.log(req.body, currentOwner === owner)
        if (player.waiver_required === true) {
          /*
          // submit claim. Will this have a separate database that stores waiver requests? 
          Then script is run that completes the actions in sequential order?
          */
        }
        if (req.body.add === true && currentOwner === null) {
          // add player, add in check for if waiver is required
          return players.updatePlayer(player_id, { owner_id: owner})
        } else if (req.body.add === false && currentOwner === owner) {
          // drop player
          return players.updatePlayer(player_id, { owner_id: null })
        } else {
          throw 'Illegal transaction'
        }
      })
      .catch(e => console.log(e))
  })
  app.put('/activatePlayer', (req, res, next) => {
    const active = req.body.active
    players
      .update(
        req.body.id, { active }
      )
      .then(response => { res.sendStatus(200) })
      .catch(e => {
        console.log('In error')
        res.status(400).json(e.message)
      })
  })
  app.get('/myTeam', (req, res, next) => {
    console.log('/myTeam')
    return res.sendFile(__dirname + '/myTeam.html')
  })

  app.listen(7555, () => {
    console.log('Server running on http://localhost:7555')
  })
