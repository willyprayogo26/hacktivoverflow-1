const router = require('express').Router()
const users = require('./users')
const questions = require('./questions')
const answers = require('./answers')
const tags = require('./tags')
const { isLogin } = require('../middlewares')
const { UserController } = require('../controllers')

router.post('/registerAdmin', UserController.registerAdmin)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google-login', UserController.googleLogin)

router.use('/questions', questions)
router.use('/answers', answers)

router.use(isLogin)
router.use('/users', users)
router.use('/tags', tags)

module.exports = router