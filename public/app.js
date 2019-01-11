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

const PlayerQuery = document.querySelector('.PlayersQuery')
PlayerQuery.addEventListener('submit', (e) => {
  e.preventDefault()
  const position = PlayerQuery.querySelector('.position').value

  get('/players/' + position)
    .then(result => {
      const div = document.getElementById("tableSection")
      // clear table
      while (div.firstChild) {
        div.removeChild(div.firstChild)
      }
      
      const table = document.createElement("table")
      const tableHeader = document.createElement("th")
      tableHeader.innerHTML = `All ${position}s`
      table.appendChild(tableHeader)

      result.body.getReader().read().then((player, done) => {
        if (done) return
        const row = document.createElement("tr")
        const cell = document.createElement("td")
        cell.innerText = player.name
        row.appendChild(cell)
        table.appendChild(row)
      })

      // for (player in playerArray) {
      //   console.log(index, player)
      //   const row = document.createElement("tr")
      //   const cell = document.createElement("td")
      //   cell.innerText = player.name
      //   row.appendChild(cell)
      //   table.appendChild(row)
      // }

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