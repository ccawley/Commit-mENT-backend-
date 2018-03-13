const db = require('../db/knex.js')
const knex = require('../db/knex')
const bcrypt = require('bcryptjs')

class User {
  constructor() {}

  static index() {
    return knex('users')
  }

  static getById(id) {
    return knex('users')
      .where('id', id)
      .first()
  }

  static getUserByEmail (email) {
    return db('users')
    .select('id')
    .where({ email })
    .first()
  }

  static tryLoginUser(email, password) {
    return knex('users')
      .select('password')
      .first()
      .where({email})
      .then(queryResult => {
        if (!queryResult) return false
        return bcrypt.compareSync(password, queryResult.password)
      });
  }

  static create(first_name, last_name, email, password) {
    const hashed_password = bcrypt.hashSync(password)
    return db('users')
    .insert( {first_name, last_name, email, hashed_password} )
    .returning('*')
  }

  static update(id, updateUser) {
    return knex('users')
      .where('id', id)
      .update(updateUser)
      .returning('*')
  }

  static destroy(id) {
    return knex('users')
      .where('id', id)
      .del()
      .returning('*')
  }

}

module.exports = User
