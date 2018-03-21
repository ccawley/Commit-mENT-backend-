

class AuthController {
  constructor() {}

  static prepParams(req, res, next) {
    let {code, state} = req.query
    let params = {
      client_id:process.env.CLIENT_ID,
      client_secret:process.env.CLIENT_SECRET,
      code: code,
      redirect_uri: 'http://commit-m-test.surge.sh',
      state: state
    }


  }
}

module.exports = AuthController
