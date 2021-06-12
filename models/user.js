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
    },
    is_selected:{
        type : String,
        required : true
    },
    topics : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Topic"
        }
    ]
},{ timestamps : true });


const User = mongoose.model('User',userSchema);

module.exports = User;