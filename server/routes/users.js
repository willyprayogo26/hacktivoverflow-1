const router = require('express').Router()
const { UserController } = require('../controllers')
const { isAuthorizedAdmin, isAuthorizedUser } = require('../middlewares')

router.get('/:id', isAuthorizedUser, UserController.getUserById)
router.patch('/add/:id', isAuthorizedUser, UserController.addTag)
router.patch('/delete/:id', isAuthorizedUser, UserController.deleteTag)

router.use(isAuthorizedAdmin)
router.get('/', UserController.getAllUser)
router.delete('/:id', UserController.deleteUser)

module.exports = router