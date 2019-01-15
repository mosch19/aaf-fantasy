const CreateUser = document.querySelector('.CreateUser')
CreateUser.addEventListener('submit', (e) => {
  e.preventDefault()
  const username = CreateUser.querySelector('.username').value
  const team_name = CreateUser.querySelector('.team_name').value
  const password = CreateUser.querySelector('.password').value
  
  post('/createUser', { username, team_name, password })
    .then(({ status }) => {
      if (status === 200) alert('register success')
      else alert('register failed')
    })
})

const Login = document.querySelector('.Login')
Login.addEventListener('submit', (e) => {
  e.preventDefault()
  const username = Login.querySelector('.username').value
  const password = Login.querySelector('.password').value

  post('/login', { username, password })
    .then(({ status }) => {
      if (status !== 200) alert('login failure')
      else window.location.href = '/myTeam'
    })
})

const ActivatePlayer = document.querySelector('.activatePlayer')
ActivatePlayer.addEventListener('submit', (e) => {
  e.preventDefault()
  const player_id = ActivatePlayer.querySelector('.player_id').value

  put('/activatePlayer', { 
    id: player_id,
    active: true
  })
  .then(result => {
    if (result.status === 200) alert('Player activated')
    else alert('Something went wrong')
  })
})

const DeactivatePlayer = document.querySelector('.deactivatePlayer')
DeactivatePlayer.addEventListener('submit', (e) => {
  e.preventDefault()
  const player_id = DeactivatePlayer.querySelector('.player_id').value

  put('/activatePlayer', { 
    id: player_id,
    active: false
  })
  .then(result => {
    if (result.status === 200) alert('Player deactivated')
    else alert('Something went wrong')
  })
})

const UpdateTeamName = document.querySelector('.UpdateTeamName')
UpdateTeamName.addEventListener('submit', (e) => {
  e.preventDefault()
  const username = UpdateTeamName.querySelector('.username').value
  const team_name = UpdateTeamName.querySelector('.team_name').value

  post('/updateTeamName', { username, team_name })
    .then(result => {
      console.log(result)
      if (result.status === 200) {
        alert('name changed')
      }
      else {
        alert('failure')
      }
  })
})

const AddPlayerToTeam = document.querySelector('.addPlayer')
AddPlayerToTeam.addEventListener('submit', (e) => {
  e.preventDefault()
  const owner_id = AddPlayerToTeam.querySelector('.owner_id').value
  const player_id = AddPlayerToTeam.querySelector('.player_id').value

  put('/playerTransaction', { owner_id, player_id, add: true })
    .then(result => {
      if (result.status === 200) {
        alert('Player added')
      } else {
        /*
        TODO this is getting back a promise that needs to be unwrapped with .json() before getting the errors. 
        Come up with better way to get errors to display to user.
        */
        alert('Error something went wrong')
      }
    })
})

const DropPlayerFromTeam = document.querySelector('.dropPlayer')
DropPlayerFromTeam.addEventListener('submit', (e) => {
  e.preventDefault()
  const owner_id = DropPlayerFromTeam.querySelector('.owner_id').value
  const player_id = DropPlayerFromTeam.querySelector('.player_id').value

  put('/playerTransaction', { owner_id, player_id, add: false })
    .then(result => {
      if (result.status === 200) {
        alert('Player dropped')
      } else {
        alert('Something went wrong')
      }
    })
})

const TeamRoster = document.querySelector('.TeamRoster')
TeamRoster.addEventListener('submit', (e) => {
  e.preventDefault()
  const owner_id = TeamRoster.querySelector('.owner_id').value
  get('/players/?owner_id=' + owner_id)
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
})

const PlayerQuery = document.querySelector('.PlayersQuery')
PlayerQuery.addEventListener('submit', (e) => {
  e.preventDefault()
  let params = ''
  let position = PlayerQuery.querySelector('.position').value
  if (position !== 'All') {
    params = '?position=' + position
  }
  /*
  /players/player_id/owner_id/position/active
  Need to sort players by position, owner id (see free agents , get rosters), active for scoreboard
  */
  get('/players' + params)
    .then(response => response.json())
    .then(response => {
      console.log(response)
      const div = document.getElementById("tableSection")
      // clear table
      while (div.firstChild) {
        div.removeChild(div.firstChild)
      }

      const table = document.createElement("table")
      // TODO height is being read in as a date
      for (property in response[0]) {
        let header = document.createElement("th")
        header.innerHTML = property
        table.appendChild(header)
      }

      for (index in response) {
        const row = document.createElement("tr")
        for (key in response[index]) {
          let field = document.createElement("td")
          field.innerText = response[index][key]
          row.appendChild(field)
        }
        
        table.appendChild(row)
      }

      div.appendChild(table)
    })
})

function post (path, data) {
  return window.fetch(path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

function put (path, data) {
  console.log(data)
  return window.fetch(path, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(data)
  })
}

function get (path, data) {
  return window.fetch(path, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}