const express = require('express')
const router = express.Router()
const { UsersController } = require('../controllers')

// ALL CURRENTLY DEAD ROUTES

router.get('/', UsersController.index)
// router.get('/:id', UsersController.getById)
// router.post('/register', UsersController.create)
// router.post('/login', UsersController.login)
// router.put('/:id', UsersController.update)
// router.delete('/:id', UsersController.destroy)


module.exports = router
