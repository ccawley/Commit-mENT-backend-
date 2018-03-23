const db = require('../db/knex.js')
const knex = require('../db/knex')
const bcrypt = require('bcrypt')
const axios = require('axios')


class User {
  constructor() {}

  static index() {
    return knex('users')
  }

  static create({token}) {
    let header = {Authorization:` token ${token}`}
    axios.get('https://api.github.com/user', {headers: {header}})
  }

}

module.exports = User
