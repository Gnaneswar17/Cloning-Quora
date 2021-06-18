const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    followers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    questions : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Question"
    }],
    admin : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    desc : {
        type : String,
        required : true
    }
},{ timestamps : true });


const Space = mongoose.model('Space',spaceSchema);

module.exports = Space;