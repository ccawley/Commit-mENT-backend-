const { User, Token } = require('../models')

class UsersController {
  constructor() {}

  static index (req, res, next) {
    User.index()
      .then(users => {
        return res.json({ users })
      })
      .catch(err => {
        console.log('Error!', err)
      })
  }

  static getById (req, res, next) {
    const id = req.params.id

    User.getById(id)
      .then(user => {
        return res.json({ user })
      })
      .catch(err => {
        console.log('Error!', err)
      })
  }

  // static login (req, res, next) {
  //   const { email, password } = req.body
  //   if (!email || !password) return res.status(401).json({ error: { message: 'Both Email and Password are needed.' } })
  //   User.tryLoginUser(email, password)
  //     .then(isLoggedIn => {
  //       //if login failed respond as such. could have failed from EITHER email OR password
  //       if (!isLoggedIn) return res.status(401).json({ error: { message: 'Login failed' } })
  //       return User.getUserByEmail(email)
  //     })
  //     //'id' === id's ID from database.
  //     .then(id => {
  //       // failed to get id via email
  //       if(!id) return res.sendStatus(403)
  //       let payload = {
  //         loggedIn: true,
  //         sub: {
  //           id
  //         },
  //         exp: parseInt(Date.now() + 10000000)
  //       }
  //     })
          // Token.sign(payload, TOKEN_SECRET)
          //   .then(token => {
          //     if (!token) {
          //       return res.sendStatus(403)
          //     } else {
          //       return res.set('Auth', `Bearer: ${token}`).send('password correct, JWT set in Auth header')
          //     }
          //
          //   })


        // }

        // else return res.sendStatus(403)
  // }

  static create (req, res, next) {
    const { first_name, last_name, email, password } = req.body
    //if missing first,last,email,password? bumps to errHandlr
    if (!first_name || !last_name || !email || !password) next({status: 400, message: `First, Last, Email, and Password needed.`})
    //search for user by email
    User.getUserByEmail(email)
      .then(existingUser => {
        //if there WAS already a user with that email, then throw an error.
        if (existingUser) next({status: 409, message: `Email: ${email} - is already in use.`})
        //otherwise! (meaning no user was found) make a new user
        return User.create(first_name, last_name, email, password)
      })
      .then(createdUser => {
        //signing token with newly created user's ID
        return Token.sign(createdUser[0].id)
      })
      .then(token => {
        if (!token) {
          //if no token > returns 403 error
          // return res.sendStatus(403)
          return next({status: 400, message: `Token: token creation failed.`})
        } else {
          //sets signed token in Auth Header
          return res.set('Auth', `Bearer: ${token}`).send('Password correct, JWT set in Auth header')
        }
      })
      .catch(err => {
        console.log('Error!', err)
      })
  }

  static update (req, res, next) {
    const id = req.params.id
    const updateUser = req.body

    User.update (id, updateUser)
      .then(user => {
        user = user[0]
        return res.json({ user })
      })
      .catch(err => {
        console.log('Error!', err)
      })
  }

  static destroy (req, res, next) {
    const id = req.params.id

    User.destroy(id)
      .then(user => {
        user = user[0]
        res.json({ user })
      })
      .catch(err => {
        console.log('Error!', err)
      })
  }

}


module.exports = UsersController
