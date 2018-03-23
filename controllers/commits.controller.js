const { Commit } = require('../models')

class CommitsController {
  constructor() {}

  static index (req, res, next) {
    console.log('ctrl')
    Commit.index()
      .then(commits => {
        console.log(commits)
        return res.json({ commits })
      })
      .catch(err => {
        console.log('Error!', err)
      })
  }

}


module.exports = CommitsController
