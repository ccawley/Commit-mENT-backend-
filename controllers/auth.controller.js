const {Token} = require('../models')

class AuthController {
  constructor() {}

  static prepParams(req, res, next) {
    let {code, state} = req.query
    let params = {
      client_id:process.env.CLIENT_ID,
      client_secret:process.env.CLIENT_SECRET,
      code: code,
      redirect_uri: 'http://commit-m.surge.sh',
      state: state
    }
    console.log('This is BODY', params)
    Token.tokenExchange(params)
      .then(data => {
        console.log('ctrl data is actually.....',data);
        res.status(200).send(data)
      })
      .catch(err)
  }
}

module.exports = AuthController
