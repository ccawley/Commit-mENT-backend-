const db = require('../db/knex.js')
const knex = require('../db/knex')

let likes = [{like: 2}]

class Like {
  constructor() {}

  static index() {
    console.log('model');
    return likes
  }

}

module.exports = Like
