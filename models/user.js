const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required : true,
        unique : true
    },
    password :{
        type : String,
        required : true
    },
    fname : {
        type : String,
        required : true
    },
    lname : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    DOB : {
        type : Date,
        required : true
    },
    is_verified : {
        type : String,
        required : Boolean
    }
},{ timestamps : true });


const User = mongoose.model('User',userSchema);

module.exports = User;