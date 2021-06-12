const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'User'
    },
    otp :{
        type : String,
        required : true
    },
    
},{ timestamps : true });


const Otp = mongoose.model('Otp',otpSchema);

module.exports = Otp;