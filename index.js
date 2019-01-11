const express = require('express')
const bodyParser = require('body-parser')
const account = require('./account')
const team = require('./team')
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

  app.listen(7555, () => {
    console.log('Server running on http://localhost:7555')
  })
