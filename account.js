const crypto = require('crypto')
const knex = require('knex')(require('./knexfile'))

module.exports = {
  createUser ({ username, password }) {
    console.log(`Add user ${username}`)
    const { salt, hash } = saltHashPassword({ password })
    return knex('users').insert({
      salt,
      encrypted_password: hash,
      username
    }, ['id'])
  },
  authenticate ({ username, password }) {
    console.log(`Authenticating user ${username}`)
    return knex('users').where({ username })
      .then(([user]) => {
        if (!user) return { success: false }
        const { hash } = saltHashPassword({
          password,
          salt: user.salt
        })
        if (hash !== user.encrypted_password) throw 'Incorrect password'
        return user.id
      })
  },
  getUserId ({ username }) {
    return knex('users').where({ username }).select('id')
  }
}

function saltHashPassword ({ password, salt = randomString() }) {
  const hash = crypto
    .createHmac('sha512', salt)
    .update(password)
  return {
    salt,
    hash: hash.digest('hex')
  }
}

function randomString() {
    return crypto.randomBytes(4).toString('hex')
}