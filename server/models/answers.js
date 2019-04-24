const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please input title']
    },
    description: {
        type: String,
        required: [true, 'Please input description']
    },
    votes: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            status: Number
        }
    ],
    questionId: {
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: {}
})

const Answer = mongoose.model('Answer', answerSchema)

module.exports = Answer