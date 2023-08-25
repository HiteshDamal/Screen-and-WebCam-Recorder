import React from 'react'
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import './Login.css'

const Login = (props) => {
  const[credentials,setCredentials]=useState({email:"",password:""});
  let history= useNavigate();

      const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch(`http://localhost:5000/auth/login`, {
          method: "POST",

          headers: {
              "Content-Type": "application/json",

          },
          body: JSON.stringify({ email:credentials.email, password:credentials.password }),
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
          // save the auth toke and redirect
          localStorage.setItem('auth-token',json.token);
          history("/record")
          props.showAlert("Logged in Successfully","success")
      }else{
          props.showAlert("Invalid credentials","danger")
      }

  }
  const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })

  }
  return (

    <>
      <div className="container">
       <form onSubmit={handleSubmit} id="form2">
        <h1>Login</h1>
        <div className="input-control">
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter Your Email Address" onChange={onChange} id="email" name="email" required/>
            <div className="error"></div>
            
        </div>
        <div className="input-control">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter Your Password" onChange={onChange}id="password" name="password" required/>
            <div className="error"></div>
        </div>
        <button type="Submit" className='btn3'>Login</button>
       </form>
    </div>
    </>
  )
}

export default Login
