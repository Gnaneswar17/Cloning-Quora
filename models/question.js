const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question : {
        type : String,
        required : true
    },
    relatedTopics : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Topic"
    }],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
},{ timestamps : true });


const Question = mongoose.model('Question',questionSchema);

module.exports = Question;