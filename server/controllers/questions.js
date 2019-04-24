const { Question } = require('../models')
const { helperTag } = require('../helpers')

class QuestionController {
    static getAllQuestion(req, res) {
        Question.find({})
            .populate('userId')
            .populate('answers')
            .then(questions => {
                res.status(200).json(questions)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getQuestionById(req, res) {
        Question.findOne({
            _id: req.params.questionId
        })
            .populate('userId')
            .populate({
                path: 'answers',
                populate: {
                    path: 'userId'
                }
            })
            .then(question => {
                res.status(200).json(question)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static createQuestion(req, res) {
        let temp = helperTag.checkTag(req.body.tags)

        Question.create({
            title: req.body.title,
            description: req.body.description,
            tags: temp,
            userId: req.user.id
        })
            .then(question => {
                res.status(201).json(question)
            })
            .catch(err => {
                if (err.errors.title) {
                    res.status(400).json({
                        message: err.errors.title.message
                    })
                } else if (err.errors.description) {
                    res.status(400).json({
                        message: err.errors.description.message
                    })
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static updateQuestion(req, res) {
        let temp = helperTag.checkTag(req.body.tags)

        Question.findOneAndUpdate({
            _id: req.params.questionId
        }, {
                title: req.body.title,
                description: req.body.description,
                tags: temp
            }, {
                new: true
            })
            .then(question => {
                if (question) {
                    res.status(200).json(question)
                } else {
                    res.status(404).json({
                        message: 'Question not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static voteQuestion(req, res) {
        let status = req.body.status;
        let vote = null;
        status === 'upvote' ? vote = 1 : vote = -1;
        let questionId = req.params.questionId;
        let userId = req.user.id
        Question.findById(questionId)
            .then(question => {
                if (question) {
                    let index = question.votes.findIndex(v => {
                        return v.userId.toString() === userId.toString();
                    })
                    if (index < 0) {
                        question.votes.push({
                            userId: userId,
                            status: vote
                        })
                    } else {
                        if (question.votes[index].status == vote) {
                            question.votes = question.votes.filter(v => {
                                return v.userId.toString() != userId.toString();
                            })
                        } else {
                            question.votes[index].status = vote;
                        }
                    }
                    question.save();
                    res.status(200).json(question)
                } else {
                    res.status(400).json({
                        message: 'Wrong question Id'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static deleteQuestion(req, res) {
        Question.findOneAndDelete({
            _id: req.params.questionId
        })
            .then(question => {
                if (question) {
                    res.status(200).json({
                        message: 'Question successfully deleted'
                    })
                } else {
                    res.status(404).json({
                        message: 'Question not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = QuestionController