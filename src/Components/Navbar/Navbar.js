import React ,{useState}from 'react'
import { Link ,useLocation} from 'react-router-dom'
import {  useNavigate } from 'react-router-dom';

const Navbar = (props) => {
    const location =useLocation();
    let history= useNavigate();
    const isLoggedIn = localStorage.getItem('auth-token');

    // const handleLogout = () => {
    //     localStorage.removeItem('auth-token');
    //     history('/login');
        
    // };
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('auth-token'));

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        setLoggedIn(false);
        history('/login')

    };


    
    
  return (
    <>
     <nav className="navbar navbar-expand-lg bg-dark bg-body-tertiary">
        <div className="container-fluid">
            <Link className={`nav-link navbar-brand ${location.pathname==="/"?"active":""}`} to="/">Recorder</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className= {`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                    </li>
                </ul>

                {isLoggedIn ? (
                            <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                        ) : (
                            <form className="d-flex" role="search" id="form3">
                                <Link to="/login"  role="button" aria-pressed="true"className=' btn mx-1 btn-secondary btn-lg active' style={{backgroundColor:"rgb(41, 57, 194)"}}>Login</Link>
                                <Link to="/signup"  role="button" aria-pressed="true"className=' btn mx-1 btn-secondary btn-lg active'style={{backgroundColor:"rgb(41, 57, 194)"}}>Sign up</Link>
                            </form>
                        )}
            </div>
        </div>
    </nav> 
</>
  )
}

export default Navbar
