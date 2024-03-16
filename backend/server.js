//gets the express package
const express = require('express');

const mongoose = require('mongoose')

const workoutRoutes = require('./routes/workouts')

//Allows env file variables to be used
require('dotenv').config()

//invoke the express function as app
const app = express();

//middleware that fires for every request that comes in

//Parses requests sent to server as JSON, allows req.body to be used
app.use(express.json())

app.use((req,res, next)=>{
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts', workoutRoutes)

//connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
    //doesn't listen on port number until connected to db
    //Requests
    app.listen(process.env.PORT_NUMBER, ()=>{
        console.log("Connected to DB and Listening on port 4000");
        })
    })
    .catch((error)=>{
        console.log(error)
    })

