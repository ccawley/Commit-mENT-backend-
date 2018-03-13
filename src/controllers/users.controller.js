const { User, Token } = require('../models')

class UsersController {
  constructor() {}

  static index (req, res, next) {
    User.index()
      .then(users => {
        return res.json({ users })
      })
      .catch(err => {
        console.log('Error!', err);
      })
  }

  static getById (req, res, next) {

  }

  static login (req, res, next) {

  }

  static create (req, res, next) {

  }

  static update (req, res, next) {

  }

  static destroy (req, res, next) {

  }

}


module.exports = UsersController
