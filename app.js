require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const route = require('./Routes/routes')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'))
app.use(fileUpload())
app.use(cors())
app.use('/api',route)

async function connection(){
const conn = await mongoose.connect(process.env.CONN,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
});
  await parseAndLoadPlanetsData();
if(conn){
    console.log("database connect successfull")
    app.listen(process.env.PORT,()=>console.log(`app listen at port ${process.env.PORT}`))
}
}

connection();