const express = require('express')
const router = express.Router()
const { UsersController } = require('../controllers')


router.get('/all', UsersController.index)
router.post('/', UsersController.getUser)


module.exports = router
