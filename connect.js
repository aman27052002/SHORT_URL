const mongoose = require("mongoose")
const url  = process.env.MONGODB_URI

async function ConnectToDB(){
    try {
        mongoose.connect(url).
        then(()=>console.log("Mongodb connected successfully")).
        catch((e)=>console.log("mongodb not connected : ",e))

    } catch (error) {
        console.log("error occered while connecting to db ...",error)
    }
}

module.exports = {
    ConnectToDB
}
