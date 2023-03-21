import React,{useState} from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import GoogleButton from 'react-google-button'
import {app } from "./firebase"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { userAuth } from './contex';


const Login = () => { 
    let navigate = useNavigate()
    const googleProvider = new GoogleAuthProvider()
    const {user} = useContext(userAuth)
    const auth = getAuth(app)
  const [email , setEmail]= useState("");
  const [password, setpassword]= useState("")

  const signUser = (e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth,email,password).then(()=>navigate("/")).catch((err)=>toast.error(err.message,{
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
   const loginWithGoogle =async ()=>{
    const usr = await signInWithPopup(auth,googleProvider )
    if(usr.user.email=="saurabhpacharne007@gmail.com"){
      navigate("/feed")
    }else{
      navigate("/")
    }
  }

  return (
    <>
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
  <div className='container-fluid'>
    <a href="" className='navbar-brand'>FASTNEWS</a>
    <ul className='navbar-nav '>
      <li className='nav-item '><NavLink className='nav-link'to="/register">Register</NavLink>
      </li>
      </ul>
</div>
</nav>
    <div className='container'>
    <h1 className=" text-center mt-5"> Login Here</h1>
        <div className='row justify-content-center'>
            <div className='col-lg-6 col-md-6 col-sm-12 shadow-lg p-4 mt-5'>
            <form>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name = "email"className="form-control" value={email} id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e=>setEmail(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" name='password' value={password}  className="form-control" id="exampleInputPassword1" onChange={e=>setpassword(e.target.value)}/>
  </div>
 <div className='text-center'> 
 <button type="submit" onClick ={e=>signUser(e)}className="btn btn-dark " >Login</button>
 </div>
 <div className='d-flex justify-content-center '> 
   <GoogleButton className='bg-dark' onClick={loginWithGoogle}/>
 </div>
 <p className='mt-2'>
              Have an account?{" "}
              <a
                className="mt-2 text-center"
                type="button"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </a>
            </p>
</form>

            </div>

        </div>

    </div>
    <ToastContainer/>
    </>
  )
}

export default Login