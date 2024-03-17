import {Link} from 'react-router-dom'

const Navbar = () =>{
    return (
        <header>
        
            <div className="container">
            <Link to = "/">
            
                <h1>Workout Logbook</h1>
            </Link>
            <span class="material-symbols-outlined">exercise</span>
            </div>
        </header>
    )
}

export default Navbar