

class AuthController {
  constructor() {}

  static prepParams(req, res, next) {
    let {code, state} = req.body
    let params = {
      client_id:process.env.CLIENT_ID,
      client_secret:process.env.CLIENT_SECRET,
      code: code,
      redirect_uri: 'http://commit-m-test.surge.sh',
      state: state
    }

    console.log(params)
  }
}

module.exports = AuthController
