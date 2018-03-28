const db = require('../db/knex.js')
const knex = require('../db/knex')

let likes = [{like: 2}]

class Like {
  constructor() {}

  static index() {
    return knex('users_likes')
  }

}

module.exports = Like
