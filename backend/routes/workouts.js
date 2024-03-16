const express = require('express')
const {createWorkout,
        getSingleWorkout,
        getAllWorkouts, 
        deleteWorkout,
         updateWorkout} = require('../controllers/workoutController')
const router = express.Router()


//GET all workouts
router.get('/', getAllWorkouts)

//GET single workout
router.get('/:id', getSingleWorkout)

//POST a workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', deleteWorkout)
//UPDATE a workout
router.patch('/:id', updateWorkout)

module.exports = router