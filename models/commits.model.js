const db = require('../db/knex.js')
const knex = require('../db/knex')
const bcrypt = require('bcrypt')


class Commit {
  constructor() {}

  static index() {
    console.log('model');
    // should return all commits from every user!
    return knex('commits')
  }

}

module.exports = Commit
