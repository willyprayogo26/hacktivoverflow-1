const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema ({
    title: {
        type: String,
        required: [true, 'Please input title']
    },
    description: {
        type: String,
        required: [true, 'Please input description']
    },
    answers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Answer'
        }
    ],
    votes: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            status: Number
        }
    ],
    tags: [{
        type: String
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: {}
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question