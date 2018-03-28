const { Like } = require('../models')

class LikesController {
  constructor() {}

  static index (req, res, next) {
    console.log('ctrl');
    Like.index()
      .then(likes => {
        console.log(likes)
        return res.json({ likes })
      })
      .catch(err => {
        console.log('Error!', err)
      })
  }

}


module.exports = LikesController
