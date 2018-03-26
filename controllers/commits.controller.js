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
    // axios call hell begins here...
    //gets all repos for a specific user as an array
        // loop over array and hunt for 'full_name' (that's the username and reponame)

    // https://api.github.com/repos/just-hey/g-snacks-client/commits
    //gets all commits for a specific repo as an array
    console.log("here bitches");
    console.log(req.body.username);
    axios.get(`https://api.github.com/users/${req.body.username}/repos`)
      .then(result => {
        let githubInfo = result.data.map(repo => {
          return repo.full_name
        })
        return githubInfo
      })
      .then(githubInfo => {
        return axios.get(`https://api.github.com/repos/${githubInfo[0]}/commits`)
        // console.log(githubInfo);
        // Promise.all(githubInfo.map(repo => {
        //   return axios.get(`https://api.github.com/repos/${repo}/commits`)
        // }))
        //   .then(result => {
        //     console.log('Hi', result);
        //   })
      })
      .then(data => {
        console.log(data)
      })
      .catch(err => console.log(err))
      // .then(promises => {
      //   return Promise.all(promises).then(result => {
      //     console.log('Hi', result);
      //   })
      // })
      // .then(result => {
      //   // console.log(result);
      // })
    // Commit.create()
    //   .then(commits => {
    //     return res.json({ commits })
    //   })
    //   .catch(err => {
    //     console.log('Error!', err);
    //   })
  }

}


module.exports = CommitsController

// console.log('womp')
// let commitsArray = githubInfo.map(repo => {
//   console.log('spam?', repo)
//   return axios.get(`https://api.github.com/repos/${repo}/commits`)
//     .then(result => {
//       console.log('here!',typeof result.data)
//       let arrayOfObjs = result.data.map(result => {
//         let returningObj = {
//           createdAt: commit.committer.date,
//           message: commit.committer.message
//         }
//         // console.log('halp',returningObj)
//         return returningObj
//       })
//       return arrayOfObjs
//     })
// })
// return commitsArray
