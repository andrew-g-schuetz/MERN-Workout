//Functions to be referenced by the router file

const Workout = require('../models/workoutModels')
const mongoose = require('mongoose')

//get all workouts
const getAllWorkouts = async(req,res) =>{
    //Finding all workouts and a empty object is needed 
    //createdAt: -1 will order them in descending order
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

//get a single workout
const getSingleWorkout = async(req,res) =>{
    //Getting the id from the route parameters
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }
    const workout = await Workout.findById(id)

    //If workout can't be found
    if(!workout){
        res.status(404).json({error: "No such workout exists"})
    }

    res.status(200).json(workout)
}
//create new workout
const createWorkout = async(req, res)=>{
    const {title, load, reps} = req.body
    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }

    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all fields', emptyFields})
    }
    try{
        //Adds the document to the collection in mongo
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//delete a workout
const deleteWorkout = async(req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    //_id is the key in mongodb
    const workout = await Workout.findOneAndDelete({_id: id})

     //If workout can't be found
    if(!workout){
        res.status(404).json({error: "No such workout exists"})
    }

    res.status(200).json(workout)
}
//update a workout
const updateWorkout = async(req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    //Second arguments is what needs to be updated
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body //spreading the object
    })

    //If workout can't be found
     if(!workout){
        res.status(404).json({error: "No such workout exists"})
    }

    res.status(200).json(workout)
}

module.exports = {createWorkout, getAllWorkouts, getSingleWorkout, deleteWorkout, updateWorkout}