const db = require('../db/knex.js')
const knex = require('../db/knex')
const bcrypt = require('bcrypt')


class Commit {
  constructor() {}

  static index () {
    console.log('model')
    // should return all commits from every user!
    return knex('commits')
  }

  //take in username, get OUR user_id from 'users' table, use that id to get all commits with that ID
  static userCommits (username) {
    return knex('users')
      .where({ user_name: username })
      .first()
      .then(userInfo => {
        return knex('commits')
          .where({ user_id: userInfo.id })
      })
  }

  static create () {
    
  }

}

module.exports = Commit


// https://api.github.com/users/just-hey/repos
//gets all repos for a specific user as an array
    // loop over array and hunt for 'full_name' (that's the username and reponame)

// https://api.github.com/repos/just-hey/g-snacks-client/commits
//gets all commits for a specific repo as an array
