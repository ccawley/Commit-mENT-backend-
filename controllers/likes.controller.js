const { Like } = require('../models')

class LikesController {
  constructor() {}

  static index (req, res, next) {
    Like.index()
      .then(likes => {
        return res.status(200).send(likes)
      })
      .catch(console.error)
  }

  static getOne (req, res, next) {
    Like.getOne(req.params.id)
      .then(like => {
        return res.status(200).send(like)
      })
      .catch(console.error)
  }

  static leaders (req, res, next) {
    Like.leaders()
      .then(likes => {
        return res.status(200).send(likes)
      })
      .catch(console.error)
  }

  static addOrRemoveLike (req, res, next) {
    Like.addOrRemoveLike(req.body)
      .then(like => {
        return res.status(200).send(like)
      })
      .catch(console.error)
  }

}


module.exports = LikesController
