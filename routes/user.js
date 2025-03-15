const express = require("express")

const router = express.Router()
const { handleSignup, handleLogin } = require('../controllers/User')
router.post('/login',handleLogin)
router.post('/signup',handleSignup)

module.exports = router