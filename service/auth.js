const jwt = require("jsonwebtoken")
function setUser(user){
  const {name,email,_id} = user
  return jwt.sign({name,email,_id},process.env.JWT_SECRET)
}
function getUser(token){
 return jwt.verify(token,process.env.JWT_SECRET)
}

module.exports = {setUser,getUser}