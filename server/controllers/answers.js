const { Answer, Question } = require('../models')

class AnswerController {
    static getAnswerByQuestionId(req, res) {
        Answer.find({
            questionId: req.params.questionId
        })
            .then(answers => {
                res.status(200).json(answers)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static createAnswer(req, res) {
        Answer.create({
            title: req.body.title,
            description: req.body.description,
            questionId: req.body.questionId,
            userId: req.user.id
        })
            .then(answer => {
                return Question.findByIdAndUpdate({
                    _id: answer.questionId
                }, {
                        $push: {
                            answers: answer._id
                        }
                    }, {
                        new: true
                    })
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

    static updateAnswer(req, res) {
        Answer.findOneAndUpdate({
            _id: req.params.answerId
        }, {
                title: req.body.title,
                description: req.body.description
            }, {
                new: true
            })
            .then(answer => {
                if (answer) {
                    res.status(200).json(answer)
                } else {
                    res.status(404).json({
                        message: 'Answer not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static voteAnswer(req, res) {
        let status = req.body.status;
        let vote = null;
        status === 'upvote' ? vote = 1 : vote = -1;
        let answerId = req.params.answerId;
        let userId = req.user.id
        Answer.findById(answerId)
            .then(answer => {
                if (answer) {
                    let index = answer.votes.findIndex(v => {
                        return v.userId.toString() === userId.toString();
                    })
                    if (index < 0) {
                        answer.votes.push({
                            userId: userId,
                            status: vote
                        })
                    } else {
                        if (answer.votes[index].status == vote) {
                            answer.votes = answer.votes.filter(v => {
                                return v.userId.toString() != userId.toString();
                            })
                        } else {
                            answer.votes[index].status = vote;
                        }
                    }
                    answer.save();
                    res.status(200).json(answer)
                } else {
                    res.status(400).json({
                        message: 'Wrong answer Id'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static deleteAnswer(req, res) {
        Answer.findOneAndDelete({
            _id: req.params.answerId
        })
            .then(answer => {
                if (answer) {
                    res.status(200).json({
                        message: 'Answer successfully deleted'
                    })
                } else {
                    res.status(404).json({
                        message: 'Answer not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = AnswerController