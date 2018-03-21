const { promisify } = require('util')
const { sign, verify } = require('jsonwebtoken')
const signPromise = promisify(sign)
const verifyPromise = promisify(verify)
const { SECRET_KEY } = process.env
const axios = require('axios')

class Token {
  // Both of these Token methods are async and return a PROMISE
  // static sign(id) {
  //   let payload = {
  //         loggedIn: true,
  //         sub: { id },
  //         exp: parseInt(Date.now() + 100000, 10)
  //       }
  //   return signPromise(payload, SECRET_KEY)
  // }
  //
  // below function not connected to any route at the moment...
  // static verifyAndExtractHeaderToken(header) {
  //   const token = header.authorization ? header.authorization.replace('Bearer ', '') : null
  //   return verifyPromise(token, secret)
  // }

  static tokenExchange(stuff) {
    axios.post('https://github.com/login/oauth/access_token/ ', stuff)
      .then(res => console.log(res.data, 'RES'))
      .catch(err => console.log(err, 'ERR'))
  }
}

module.exports = Token
