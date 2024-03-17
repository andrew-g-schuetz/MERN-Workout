import { useEffect} from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutContext"

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from "../components/WorkoutForm"
const Home = () =>{

    const {workouts, dispatch} = useWorkoutsContext()

    useEffect(()=>{
        const fetchWorkouts = async() =>{
            const res = await fetch('/api/workouts')
            

            if(res.ok){
                const json = await res.json()
                dispatch({type:'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts()
    }, [dispatch])

    return(
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map(workout =>(
                    <WorkoutDetails workout={workout} key={workout._id} />
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home