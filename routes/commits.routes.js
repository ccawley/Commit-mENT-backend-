const express = require('express')
const router = express.Router()
const { CommitsController } = require('../controllers')

console.log('h')
router.get('/', CommitsController.index)


module.exports = router
