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
    // console.log("Controller: You've got this far, BRO!")
    // console.log(req.body);
    let token = req.body.token
    let header = {Authorization: `token ${token}`}
    axios.get(`https://api.github.com/user/repos?affiliation=owner`, { headers : header })
      .then(result => result.data.map(repo => repo.full_name))
      .then(bfa => {


        //need a reference to get only THIS users commits.
        let username = bfa[0].split('/')[0]  //gets the currently logged in user username
        //prior it was pulling every commiter message attached to the repo. so there would have been commits made by like Wes or Roger on Galvanize repos we would have cloned.

        //bfa OF arrays of objects.  We need to now filter this data because it has ALL commiters for each repo not just our user. we can do this by filtering by the "commiter" which we will have to save a reference to our users "commiter" name.
              // (ex:
              //     Anh     ===   "commiter":"Anh Trieu"
              //     Curtis  ===   "commiter":"Curtis Cawley"
              //     Mine    ===   "commiter":"Justin Hays"
              //     Rebecca ===   "commiter":"RJ"
              // )

        let promises = bfa.map(e => {
          return axios.get(`https://api.github.com/repos/${e}/commits`, { headers : header })
            .then(result => {
              //removes commits not made by user
              let filteredData = result.data.filter(commit => commit.author.login === username)
              //returns only the desired info we want: date, commiter, message
              return filteredData.filter(commit => {
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
            let newData = []
            data.forEach(el => {
              if (Array.isArray(el) && el.length > 0) newData.push(el)
            })
            res.status(200).json(newData)       //<<<<<< this will change/be moved some time
            // return Commit.create(data)      //<<<<<< we want to end up using this line!!!
          })
          // .then(commits => {
          //   res.json({ commits })
          // })
      }) // bfa === BIG FUCKING ARRAY
      .catch(err => console.log(err, "You've Got ERR, BRO!"))
  }

}


module.exports = CommitsController
