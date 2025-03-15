const jwt = require("jsonwebtoken")
const {getUser} = require('../service/auth')

async function restrictToLoggedInUserOnly(req,res,next){
    const userId = req.cookies?.token
    if(!userId){
        return res.redirect('/login')
    }
    req.user = getUser(userId)
    next();
}

module.exports = {restrictToLoggedInUserOnly}