//entry file for backend file; wehre we register the express app




//created package.json by using npm init -y
//then install express by using npm install express


require('dotenv').config()


const express = require('express')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')







// express app stored in app
const app = express()

//middleware

app.use(express.json()) //looks into the data of anything sent in if it has some body and sends it to req

app.use((req, res, next) => {

    console.log(req.path, req.method)
    next()
})




//routes

app.use('/api/workouts',workoutRoutes) //gets all the routes in workouts.js and uses them with app
app.use('/api/user', userRoutes)

//when user goes to /api/workouts they go to workoutRoutes


//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(()=> {

        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })

    })
    .catch((error) => {
        
        console.log('MONG_URI:', process.env.MONG_URI) // Check if the URI is loaded correctly

        console.log(error)
    })




