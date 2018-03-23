const express = require('express')
const router = express.Router()
const { CommitsController } = require('../controllers')

//get all commits ever
router.get('/', CommitsController.index)
//get commits for a specific user
router.get('/:username', CommitsController.userCommits)
//create commits in our server when a user logs in (makes new commits if they don't exist)
// router.post('/', CommitsController.create)


module.exports = router
