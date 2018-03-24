const db = require('../db/knex.js')
const knex = require('../db/knex')
const bcrypt = require('bcrypt')
const axios = require('axios')


class User {
  constructor() {}

  static index() {
    return knex('users')
  }

  static pullProfile({token}) {
    return axios.get(`https://api.github.com/user`, {headers: { Authorization: `token ${token}` } })
      .then(result => {
        return {user_name: result.data.login, avatar_image: result.data.avatar_url}
      })
      .catch(err => console.log(err, "YOU'VE GOT ERR, BRO!!!!"))
  }

  static getUser(username) {
    console.log('Hey, BRO!')
    return knex('users')
      .where({ user_name: username})
      .first()
      .then(match => match)
  }

  static createUser(newUser) {
    console.log('You hit me, BRO')
    return knex('users')
      .insert(newUser)
      .then(() => {
        return knex('users')
          .where({user_name: newUser.user_name})
          .first()
          .then(result => result)
      })
  }

}

module.exports = User
