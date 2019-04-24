const CronJob = require('cron').CronJob
const { nodemailer } = require('./helpers')
const { User, Question } = require('./models')
const kue = require('kue')
const queue = kue.createQueue()

let MailerJob = new CronJob('0 06 * * 1', function() {
// let MailerJob = new CronJob('36 20 * * *', function() {
    User.find({})
    .then(users => {
        users.forEach(user => {
            let email = user.email
            let message = 'Your question information:\n'
            Question.find({
                userId: user._id
            })
            .then(questions => {
                questions.forEach(question => {
                    message += `- ${question.title} have ${question.answers.length} answers \n`
                })
                queue.create('email', {
                    email,
                    message
                }).save()
            })
            .catch(err => {
                console.log(err)
            })
        })
    })

    queue.process('email', function (job, done) {
        nodemailer.Mailer(job.data.email, job.data.message)
        done()
    })
})

module.exports = MailerJob