
import './App.css';
import { useState } from 'react';
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login'
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Record from './Components/Record/Record';
import Alert from './Components/Alert/Alert';

function App() {
  const[alert,setAlert]=useState(null)
  const showAlert=(message,type)=>{
      setAlert({
          msg:message,
          type:type
      })
      setTimeout(() => {
        setAlert(null)
      }, 2000);
  }

  return (
    <>
   

    <Router>
    <Navbar showAlert={showAlert}/>
    <Alert alert={alert}/>
    
      <Routes>

      <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
      <Route exact path="/signup" element={<SignUp showAlert={showAlert} />}></Route>
      <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
      <Route exact path="/record" element={<Record showAlert={showAlert} />}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
