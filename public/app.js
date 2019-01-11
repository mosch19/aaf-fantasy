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