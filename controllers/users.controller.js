const { User, Token } = require('../models')

class UsersController {
  constructor() {}

  static index (req, res, next) {
    User.index()
      .then(users => {
        return res.json({ users })
      })
      .catch(err => {
        console.log('Error!', err)
      })
  }

  static getUser (req, res, next) {
    User.pullProfile(req.body)
      .then(({full_name, user_name, avatar_image}) => {
        User.getUser(user_name)
          .then(result => {
            if (result) {
              res.status(200).json(result)
            } else {
              User.createUser({full_name ,user_name, avatar_image})
              .then(result => res.status(200).json(result))
            }
          })
      })
      .catch(err => res.status(400))
  }

}


module.exports = UsersController
