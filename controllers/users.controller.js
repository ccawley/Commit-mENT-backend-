const { User, Token } = require('../models')

class UsersController {
  constructor() {}

  static index (req, res, next) {
    User.index()
      .then(users => {
        console.log(users)
        return res.json({ users })
      })
      .catch(err => {
        console.log('Error!', err)
      })
  }

  static createUser (req, res, next) {
    User.create(req.body)
      .then(user => res.status(200))
      .catch(err => console.log('Error!', err))
  }

}


module.exports = UsersController
