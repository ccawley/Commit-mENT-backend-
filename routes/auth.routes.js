const express = require('express')
const router = express.Router()
const {AuthController} = require('../controllers')

router.post('/auth', AuthController.prepParams)

module.exports = router
