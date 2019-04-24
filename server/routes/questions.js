const router = require('express').Router()
const { QuestionController } = require('../controllers')
const { isLogin, isAuthorizedUser } = require('../middlewares')

router.get('/', QuestionController.getAllQuestion)
router.get('/:questionId', QuestionController.getQuestionById)

router.use(isLogin)
router.post('/:id', isAuthorizedUser, QuestionController.createQuestion)
router.put('/:id/:questionId', isAuthorizedUser, QuestionController.updateQuestion)
router.patch('/:id/votes/:questionId', isAuthorizedUser, QuestionController.voteQuestion)
router.delete('/:id/:questionId', isAuthorizedUser, QuestionController.deleteQuestion)

module.exports = router