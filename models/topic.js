const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        unique : true
    },
    questions : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Question"
        }
    ]
},{ timestamps : true });


const Topic = mongoose.model('Topic',topicSchema);

module.exports = Topic;