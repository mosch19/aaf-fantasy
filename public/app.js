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
      if (status === 200) alert('login success')
      else alert('login failed')
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

  post('/addPlayer', { owner_id, player_id })
    .then(result => {
      if (result.status === 200) {
        alert('Player added')
      } else {
        /*
        TODO this is getting back a promise that needs to be unwrapped with .json() before getting the errors. 
        Come up with better way to get errors to display to user.
        */
        alert(result.data)
      }
    })
})

const DropPlayerFromTeam = document.querySelector('.dropPlayer')
DropPlayerFromTeam.addEventListener('submit', (e) => {
  e.preventDefault()
  const owner_id = DropPlayerFromTeam.querySelector('.owner_id').value
  const player_id = DropPlayerFromTeam.querySelector('.player_id').value

  post('/dropPlayer', {owner_id, player_id })
    .then(result => {
      if (result.status === 200) {
        alert('Player dropped')
      } else {
        alert(result.data)
      }
    })
})

const TeamRoster = document.querySelector('.TeamRoster')
TeamRoster.addEventListener('submit', (e) => {
  e.preventDefault()
  const owner_id = TeamRoster.querySelector('.owner_id').value
  // TODO have singular query per table using .modify() and looping through paramters. Seperate routes is dumb.
  get('/roster/' + owner_id)
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
})

const PlayerQuery = document.querySelector('.PlayersQuery')
PlayerQuery.addEventListener('submit', (e) => {
  e.preventDefault()
  const position = PlayerQuery.querySelector('.position').value

  get('/players/' + position)
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

function get (path, data) {
  return window.fetch(path, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}