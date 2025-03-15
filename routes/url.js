const express = require('express')

const { handleGenerateShortId, handleAnalytics } = require('../controllers/url')   

const router = express.Router()

router.post('/', handleGenerateShortId)
router.get('/:shortId',handleAnalytics)

module.exports = router

