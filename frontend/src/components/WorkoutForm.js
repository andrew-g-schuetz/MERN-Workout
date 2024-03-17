import {  useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutContext"


const WorkoutForm = () =>{
    const {dispatch} = useWorkoutsContext()

    const [title,setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [error, setError] = useState(null)

    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async(e) =>{
        e.preventDefault()//prevents page from reloading

        const workout = {title, load, reps}

        const res = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await res.json()

        if(!res.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }else{
            setEmptyFields([])
            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
            
            
            

            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }

    }
    return(

        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Workout</h3>

            <label>Exercise Title: </label>
            <input
                type= "text"
                onChange={(e) => setTitle(e.target.value)}
                value = {title}
                className={emptyFields.includes('title') ? 'error': ''}
            />

        <label>Load(lbs): </label>
            <input
                type = "number"
                onChange={(e) => setLoad(e.target.value)}
                value= {load}
                className={emptyFields.includes('load') ? 'error': ''}
            />

        <label>Reps: </label>
            <input
                type = "number"
                onChange={(e) => setReps(e.target.value)}
                value = {reps}
                className={emptyFields.includes('reps') ? 'error': ''}
            />

        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
        </form>
    )
}

export default WorkoutForm