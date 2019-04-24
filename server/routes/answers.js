const router = require('express').Router()
const { AnswerController } = require('../controllers')
const { isLogin, isAuthorizedUser } = require('../middlewares')

router.get('/:questionId', AnswerController.getAnswerByQuestionId)

router.use(isLogin)
router.post('/:id/:questionId', isAuthorizedUser, AnswerController.createAnswer)
router.put('/:id/:answerId', isAuthorizedUser, AnswerController.updateAnswer)
router.patch('/:id/votes/:answerId', isAuthorizedUser, AnswerController.voteAnswer)
router.delete('/:id/:answerId', isAuthorizedUser, AnswerController.deleteAnswer)

module.exports = router