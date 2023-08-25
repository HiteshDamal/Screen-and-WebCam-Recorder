import React, { useState } from 'react'
import "./SignUp.css"
import { Link } from 'react-router-dom'


import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
    const[credentials,setCredentials]= useState({name:"",email:"",password:"",cpassword:"",phone:""});
    let history= useNavigate();
    
  
        const handleSubmit = async (e) => {

        e.preventDefault();
        const {name,email,password,phone,cpassword}=credentials
        const response = await fetch(`http://localhost:5000/auth/createUser`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
               },
            body: JSON.stringify({name,email,password,phone,cpassword} ),
        });
        const json = await response.json();
        console.log(json);
      
        if(json.success){
            localStorage.setItem('auth-token',json.authtoken);
            history("/record")
            props.showAlert("Account created successfully","success")

        }
        
       

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }

  return (
    <>
    <div className="container">
       <form onSubmit={handleSubmit} id="form">
        <h2>Registration Form</h2>
        <div className="input-control">
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Enter Your Full Name" onChange={onChange}id="name" name="name" required />
            <div className="error"></div>
        </div>
        <div className="input-control">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter Your Email Address" onChange={onChange}id="email" name="email" required/>
            <div className="error"></div>
            
        </div>
        <div className="input-control">
            <label htmlFor="phone">Phone no</label>
            <input type="tel" placeholder="Enter Your Phone no" onChange={onChange}id="phone" name="phone" required/>
            <div className="error"></div>
        </div>
        <div className="input-control">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter Your Password"onChange={onChange} id="password" name="password" required/>
            <div className="error"></div>
        </div>
        <div className="input-control">
            <label htmlFor="password2">Confirm Password</label>
            <input type="password" placeholder="Confirm your Password" onChange={onChange}id="cpassword" name="cpassword" required/>
            <div className="error"></div>
        </div>
        <button type="Submit">Sign Up</button>
        <p>Already have an Account?</p>
       
       <Link to="/login"><button>Login</button></Link>
       </form>
       
    </div>
    </>
  )
}

export default SignUp

