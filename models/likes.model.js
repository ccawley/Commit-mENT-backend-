const db = require('../db/knex.js')
const knex = require('../db/knex')

let likes = [{like: 2}]

class Like {
  constructor () {}

  static index () {
    return knex('users_likes')
  }

  static getOne (id) {
    return knex('users_likes')
      .where({ id })
  }

  static leaders () {
    return knex('users_likes')
      .join('commits', 'users_likes.commit_id', 'commits.id')
      // .groupBy('commits.id')
      //this is not done!!!
      
      .count()
  }

  static addOrRemoveLike (newLike) {
    // make query for this exact match
    return knex('users_likes')
      .where(newLike)
      .first()
      .then(result => {
        //if NO match, add it
        if (!result) {
          return knex('users_likes')
            .insert(newLike)
        //if IS match, delete it
        } else {
          return knex('users_likes')
            .where(newLike)
            .del()
        }
      })
      //THEN! return the count of all likes with matching commit_id
      .then(() => {
        return knex('users_likes')
          .where({ commit_id: newLike.commit_id })
          .count()
      })
      .catch(console.error)
  }

}

module.exports = Like
