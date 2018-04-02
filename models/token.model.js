const axios = require('axios')

class Token {
  static tokenExchange(stuff) {
    return axios.post('https://github.com/login/oauth/access_token/ ', stuff)
      .then(res => {
        let arr1 = res.data.split('&')
        let token = arr1[0].split('=')[1]
        let scope = arr1[1].split('=')[1]
        return {access_token: token, scope: scope}
      })
      .catch(console.error)
  }
}

module.exports = Token
