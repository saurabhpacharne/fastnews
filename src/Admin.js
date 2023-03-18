import React, { useState } from 'react';
import "./App.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { userAuth } from './contex';
import {signOut, getAuth} from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
  const {user} = useContext(userAuth)
  let navigate = useNavigate();
  const auth = getAuth();
  const [post , setpost]= useState({
    title:"",
    description:"" ,
    category:"",
    image:""
  })
  const {title, description,image,category} = post
  
const onInputchange= (e)=>{
  setpost({...post, [e.target.name]:e.target.value})
  console.log(post)

}
const onSubmit =async(e)=>{
  e.preventDefault();
  if(image && category && description && title){
    await axios.post("http://localhost:3005/news",post);
setpost({
  title:"",
  description:"",
  image: ""
})
navigate("/feed");
  }else{
    toast.warning("Please fill all fields",{
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }
}
const userLogOut = ()=>{
  if(signOut(auth)){
    navigate("/")
  }
}

console.log(user.email)
  return (
    <>
<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
  <div className='container-fluid'>
    <a href="" className='navbar-brand'>FASTNEWS</a>
    <ul className='navbar-nav '>
      <li className='nav-item '><NavLink className='nav-link'to="/feed">Post</NavLink>
      </li>
      <li className='nav-item '><NavLink  data-bs-toggle="modal" data-bs-target="#exampleModal" className='nav-link'>{user.email}</NavLink>
      </li>
      </ul>
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        Do You Want To Logout !
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-dark" onClick={userLogOut}>Logout</button>
      </div>
    </div>
  </div>
</div>
</div>
</nav>
<div className='row '>
<h1 className='text-center mt-3 fw-bold'>ADD NEWS DETAILS </h1>
  <div className=' d-flex justify-content-center mt-4 ' id='box'>
    <form className="form col-8 col-md-8 col-sm-12 shadow-lg form-group border border-3" onSubmit={e=>onSubmit(e)} >
      <label >TITLE:</label>
      <br></br>
      <input clsaaName="form-control " type="text" id="title" name='title' value={title} onChange={e=>onInputchange(e)}  />
      <br></br>
      <label >DESCRIPTION:</label>
      <br></br>
      <textarea clsaaName="form-control" name='description' id='description'value={description} onChange={e=>onInputchange(e)}  />
      <br></br>
    <select name='category' id="categoty" value={category} onChange={e=>onInputchange(e)}>
    <option value="">Select Category</option>
      <option value="Politics">Politics</option>
      <option  value="Entertainment">Entertainment</option>
      <option value="Sports">Sports</option>
    </select>
    <br></br>
    <label>Paste img address here</label>
    <br></br>
    <input type="text" name='image' id = "image" value={image}  onChange={e=>onInputchange(e)}/>
    <div className='text-center'>
    <button className='btn btn-dark fw-bold' type='submit'>POST</button> 
    </div>
    
    </form>

  </div>

</div>
<ToastContainer/>
    </>
  )
}

export default Admin


