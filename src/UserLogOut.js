import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { userAuth } from './contex';
import {app } from "./firebase";
import {signOut,getAuth } from "firebase/auth"

const UserLogOut = () => {
    const {user} = useContext(userAuth)
    let navigate = useNavigate()
    const auth = getAuth(app);
  return (
   <>
   {
    (user)?<div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark sticky-top'>
  <div className='container-fluid'>
    <a href="" className='navbar-brand'>FASTNEWS</a>
   <div >
   <ul className='navbar-nav ms-auto'>
      <li className='nav-item '><NavLink className='nav-link'to="/">News</NavLink>
      </li>
      </ul>
   </div>
</div>
</nav>
<div className='container'>
<h2 className='text-center mt-4 mb-3 text-primary '>Hello, Do you want to logout</h2>
    <div className='row d-flex justify-content-center'>
        <div className='col-lg-6 col-md-9 col-sm-12 border border-3'>
            <h2 className='text-center mt-5'>{user.email}</h2>
           <div className='text-center mt-4'>
           <button className='btn btn-warning me-2' onClick={()=>navigate("/")} >Not Now</button>
           <button className='btn btn-danger' onClick={()=>{signOut(auth);navigate("/")}}>Logout</button>
           </div>

        </div>

    </div>

</div>
    </div>:<div>
    <h1 className='text-center mt-5 text-success'>You Have not logged in yet !</h1>
    </div>
   }
   
   </>

  )
}

export default UserLogOut