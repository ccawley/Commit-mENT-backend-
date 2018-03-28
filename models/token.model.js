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
    return axios.post('https://github.com/login/oauth/access_token/ ', stuff)
      .then(res => {
        console.log(res.data)
        let arr1 = res.data.split('&')
        let token = arr1[0].split('=')[1]
        let scope = arr1[1].split('=')[1]
        return {access_token: token, scope: scope}
      })
      .catch(err)
  }
}

module.exports = Token
