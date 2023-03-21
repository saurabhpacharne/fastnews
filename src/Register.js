import React, { useState } from 'react';
import {getAuth , createUserWithEmailAndPassword} from "firebase/auth"
import {app } from "./firebase"
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  let navigate = useNavigate()
  const auth = getAuth(app)
  const [email , setEmail]= useState("");
  const [password, setpassword]= useState("")
   
  const registerUser = (e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth,email,password).then(()=>navigate("/login")).catch((err)=>toast.error(err.message,{
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    }))
  }

  return (
    <>
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
  <div className='container-fluid'>
    <a href="#" className='navbar-brand'>FASTNEWS</a>
    <ul className='navbar-nav '>
    <li className='nav-item '><NavLink className='nav-link'to="/login">Login</NavLink>
      </li>
      </ul>
</div>
</nav>
<div className='container'>
    <h1 className=" text-center mt-5"> Register Here</h1>
        <div className='row justify-content-center'>
            <div className='col-lg-6 col-md-6 col-sm-12 shadow-lg p-4 mt-5'>
    
            <form>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name='email' className="form-control" value ={email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e=>setEmail(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name ="password" value={password} className="form-control" id="exampleInputPassword1"onChange={e=>setpassword(e.target.value)}/>
  </div>
 <div className='text-center'> <button type="submit" className="btn btn-dark " onClick={e=>registerUser(e)} >Register</button></div>
</form>

            </div>

        </div>

    </div>
    <ToastContainer/>
    </>
  )
}

export default Register