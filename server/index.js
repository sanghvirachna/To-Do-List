const express = require('express')
const Connection = require('./db.js')
const todoItemRoute = require('./routes/todoItems.js')
const cors = require('cors')
const app = express()

app.use(express.json())
Connection();
app.use(cors())
app.listen(5000,()=>{
    console.log('Server is running on port 5000')
})
app.use('/',todoItemRoute)

