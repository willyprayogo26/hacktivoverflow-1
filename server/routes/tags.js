const express = require('express')
const router = express.Router()
const { TagController } = require('../controllers')

router.get('/', TagController.getAllTag)

module.exports = router