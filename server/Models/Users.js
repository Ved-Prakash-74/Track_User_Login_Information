//The js file must be according to table name

const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    name : String , 
    email : String , 
    password : String ,
    loginHistory: [
        {
          loginTime: Date,
          ipAddress: String,
        },
    ]
})

const UsersModel = mongoose.model('TrackUserInformation' , UsersSchema)
module.exports = UsersModel