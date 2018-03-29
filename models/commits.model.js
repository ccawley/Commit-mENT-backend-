const db = require('../db/knex.js')
const knex = require('../db/knex')

class Commit {
  constructor() {}

  static index () {
    // should return all commits from every user!
    return knex('users')
      .then(users => {
        let bfp = users.map(user => {
          return knex.raw(`SELECT full_name, user_name, avatar_image, commits.id ,created_on, message FROM users, commits WHERE user_id=users.id AND users.id=${user.id}`)
          .then(result => result.rows)
        //   return knex('users')
        //     .join('commits')
        //     .select('users.full_name', 'users.user_name', 'users.avatar_image', 'commits.created_on', 'commits.message')
        //     .where('commits.user_id', 'users.id')
        //     .andWhere('users.id', user.id)
        //     .then(result => console.log(result))
        })
        return Promise.all(bfp)
          .then(result => {
            let flattened = []
            result.forEach(user => {
              user.forEach(commit => flattened.push(commit))
            })
            return flattened
          })
      })

  }

  //take in username, get OUR user_id from 'users' table, use that id to get all commits with that ID
  static userCommits (username) {
    return knex('users')
      .where({ user_name: username })
      .first()
      .then(userInfo => {
        return knex('commits')
          .where({ user_id: userInfo.id })
      })
  }

  static arrayDestroyer (data) {
    let array = []
    for (let i = 0; i < data.length; i++) {
      if(Array.isArray(data[i])){
        for (let j = 0; j < data[i].length; j++) {
          array.push(data[i][j])
        }
      }
    }
    return array
  }

  // static checkDuplicateCommits (arrayOfObjs) {
  //   let newArray = []
  //   arrayOfObjs.forEach(commit => {
  //     return knex('commits')
  //       .then(result => {
  //         result.filter(e => commit.sha !== e.sha).forEach(el => {
  //           newArray.push(el)
  //         })
  //       })
  //   })
  //   console.log(newArray);
  // }

  static async createCommits (data) {
    // console.log(data);
    // let array = []
    // for (let i = 0; i < data.length; i++) {
    //   for (let j = 0; j < data[i].length; j++) {
    let flattenedData = await this.arrayDestroyer(data)
    return knex('users')
      .where({ user_name: flattenedData[0].user_name })
      .first()
      .then(match => {
        let rePackaged = []
        flattenedData.forEach(e => {
          e.user_id = match.id
          rePackaged.push({
            user_id: e.user_id,
            created_on: e.createdAt,
            sha: e.sha,
            message: e.message})
        })
        rePackaged.forEach(obj => {
          return knex('commits').insert(obj)
            .then(data => {
              console.log(data);
              // return data
            })
            .catch(console.error)
        })
        // Promise.all(arrayOfProms)
        //   .then(data => {
        //     console.log(data);
        //     return data
        //   })
        //   .catch(console.error)
        // console.log('HEYYYYYYYYY',rePackaged[rePackaged.length - 1], 'OVER HERE')
        // for (let i = 0; i < rePackaged.length; i++) {
        //   return knex('commits')
        //     .insert(rePackaged[i])
        //     .then()
        //     .catch(console.error)
        // }
      })
      .catch(console.error)
    }
        // this.checkIfUser(data[i][j].committer)
        // // console.log(data[i][j]);
        // // return knex('users')
        // //   .where({ user_name: data[i][j].committer })
        // //   .first()
        //   .then(match => {
        //     console.log('plz', match);
        //     // If committers name exists in DB proceed...
        //     if (match) {
        //       return knex('commits') // Grabbing all commits from commit table.
        //         .where({sha: data[i][j].sha})
        //         .first()
        //         //if any commit has the same as incoming commit.sha, dont add.
        //         //else! add the incoming commit
        //         // .whereNot('sha', data[i][j].sha) // Where sha != sha entered.
        //         .then(found => {
        //           console.log("i am different", found)
        //           if (!found) {
        //             return knex('commits')
        //             .insert({ // If this far, we have a new commit to add to db.
        //               user_id: match.id,
        //               message: data[i][j].message,
        //               createdAt: data[i][j].date,
        //               sha: data[i][j].sha
        //             })
        //           } else {
        //             return null
        //           }
        //
        //             // .then()
        //         }).catch(console.error)
        //     }
        // }).catch(console.error)
      // }
    // }

}

module.exports = Commit


// https://api.github.com/users/just-hey/repos
//gets all repos for a specific user as an array
    // loop over array and hunt for 'full_name' (that's the username and reponame)

// https://api.github.com/repos/just-hey/g-snacks-client/commits
//gets all commits for a specific repo as an array
