const { Commit } = require('../models')
const axios = require('axios')

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


  static create (req, res, next) {
    console.log("Controller: You've got this far, BRO!")
    let token = req.body.token
    let header = {Authorization: `token ${token}`}
    axios.get(`https://api.github.com/user/repos?affiliation=owner`, { headers : header })
      .then(result => result.data.map(repo => repo.full_name))
      .then(bfa => {
        let promises = bfa.map(e => {
          return axios.get(`https://api.github.com/repos/${e}/commits`, { headers : header })
            .then(result => {
              return result.data.map(commit => {
                let commiter = commit.commit.committer.name
                let date = commit.commit.committer.date
                let message = commit.commit.message
                return {date, commiter, message}
              })
            })
            .catch(err => console.log(err, "More ERR here, BRO!"))
        })
        Promise.all(promises)
          .then(data => {
            //bfa OF arrays of objects.  We need to now filter this data because it has ALL commiters for each repo not just our user. we can do this by filtering by the "commiter" which we will have to save a reference to our users "commiter" name.
                  // (ex:
                  //     Anh     ===   "commiter":"Anh Trieu"
                  //     Curtis  ===   "commiter":"Curtis Cawley"
                  //     Mine    ===   "commiter":"Justin Hays"
                  //     Rebecca ===   "commiter":"RJ"
                  // )
            //it's clearly something we can have access to at some point when the person's account is created so we can pull it in from there then go about passing it around the same way we do for usernames and tokens?

            res.status(200).json(data)       //<<<<<< this will change/be moved some time
            //return Commit.create(data)      //<<<<<< we want to end up using this line!!!
          })
          // .then(commits => {
          //   res.json({ commits })
          // })
      }) // bfa = BIG FUCKING ARRAY
      .catch(err => console.log(err, "You've Got ERR, BRO!"))
  }




  //
  //   // Commit.create()
  //   //   .then(commits => {
  //   //     return res.json({ commits })
  //   //   })
  //   //   .catch(err => {
  //   //     console.log('Error!', err);
  //   //   })
  // }

}


module.exports = CommitsController
