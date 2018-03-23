const { Commit } = require('../models')

class CommitsController {
  constructor() {}

  static index (req, res, next) {
    Commit.index()
      .then(commits => {
        return res.json({ commits })
      })
      .catch(err => {
        console.log('Error!', err)
      })
  }

  static userCommits (req, res, next) {
    Commit.userCommits(req.params.username)
      .then(commits => {
        return res.json({ commits })
      })
      .catch(err => {
        console.log('Error!', err);
      })
  }

  // static create (req, res, next) {
  //   Commit.create()
  //     .then(commits => {
  //       return res.json({ commits })
  //     })
  //     .catch(err => {
  //       console.log('Error!', err);
  //     })
  // }

}


module.exports = CommitsController
