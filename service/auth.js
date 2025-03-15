const jwt = require("jsonwebtoken")
function setUser(user){
  const {name,email,_id} = user
  return jwt.sign({name,email,_id},process.env.JWT_SECRET)
}
function getUser(token){
  if(!token)return null
  try {
    return jwt.verify(token,process.env.JWT_SECRET)
  } catch (error) {
    return null
  }
}

module.exports = {setUser,getUser}