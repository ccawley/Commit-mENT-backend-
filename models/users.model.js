const db = require('../db/knex.js')
const knex = require('../db/knex')
const bcrypt = require('bcrypt')


class User {
  constructor() {}

  static index() {
    // let result = [{user: 'Anh'}, {user: 'Curtis'}, {user: 'Justin'}]
    // return result
    return knex('users')
  }

}

module.exports = User
