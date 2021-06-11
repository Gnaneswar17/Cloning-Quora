const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/MyDatabase');

const db = mongoose.connection;

db.on("error",console.error.bind(console,"There is error in connecting to DB"));

db.once('open',function(){
    console.log("Successfully Connected to db");
});