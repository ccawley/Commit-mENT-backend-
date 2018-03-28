const { Like } = require('../models')

class LikesController {
  constructor() {}

  static index (req, res, next) {
    Like.index()
      .then(likes => {
        return res.status(200).send({ likes })
      })
      .catch(console.error)
  }

}


module.exports = LikesController
