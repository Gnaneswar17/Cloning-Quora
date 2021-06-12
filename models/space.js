const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    followers : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }]
},{ timestamps : true });


const Space = mongoose.model('Space',spaceSchema);

module.exports = Space;