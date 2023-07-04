const mongoose = require('mongoose');
const todoItemSchema = new mongoose.Schema({
     item:{
        type:String,
     }
})
module.exports = mongoose.model('todo',todoItemSchema)