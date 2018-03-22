const {Token} = require('../models')

class AuthController {
  constructor() {}

  static prepParams(req, res, next) {
    let {code, state} = req.query
    console.log('code', code)
    console.log('state', state)
    let params = {
      client_id:process.env.CLIENT_ID,
      client_secret:process.env.CLIENT_SECRET,
      code: code,
      redirect_uri: 'http://commit-m.surge.sh',
      state: state
    }
    // res.status(200).json({message: 'hey team!'})
    Token.tokenExchange(params)
      .then(data => res.status(200).json(data))
  }
}

module.exports = AuthController
