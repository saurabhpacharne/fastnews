import React, { useState } from 'react';
import "./App.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { userAuth } from './contex';
import {signOut, getAuth} from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Timestamp } from 'firebase/firestore';
import {app } from "./firebase"

const Admin = () => {
  const {user,addNews} = useContext(userAuth)
  let navigate = useNavigate();
  const auth = getAuth(app);
  const [post , setpost]= useState({
    title:"",
    description:"" ,
    category:"",
    date : Timestamp.now().toDate()
  })
  const [img, setImg] = useState("")

 
const onInputchange= (e)=>{
  setpost({...post, [e.target.name]:e.target.value})
  
}
const onSubmit =async (e)=>{
  e.preventDefault();
  if(img && post.category && post.description && post.title){
   await addNews(post.title, post.description,post.category,img, post.date)
    setpost({
       title:"",
       description:"",
        img: ""
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

  return (
    <>
<nav className='navbar navbar-expand-lg navbar-dark bg-dark sticky-top'>
  <div className='container-fluid'>
    <a href="" className='navbar-brand'>FASTNEWS</a>
    <button className='navbar-toggler' type='button' data-bs-toggle="collapse"data-bs-target="#myNav">
      <span className="navbar-toggler-icon"></span>
      </button>
   <div className="collapse navbar-collapse " id="myNav">
   <ul className='navbar-nav ms-auto'>
      <li className='nav-item '><NavLink className='nav-link'to="/feed">Post</NavLink>
      </li>
      <li className='nav-item '><NavLink  data-bs-toggle="modal" data-bs-target="#exampleModal"className='nav-link'>{user.email}</NavLink>
      </li>
      </ul>
   </div>
</div>
</nav>
<div className='container'>
<h1 className=" text-center mt-4 fw-bold"> ADD NEWS DETAILS</h1>
    <div className='row d-flex justify-content-center p-3'>
      <div className='col-lg-8 col-md-8 col-sm-12  mt-3 shadow-lg bg-secondary p-1'>
      <form className="form form-group  " onSubmit={onSubmit} >
      <label >TITLE:</label>
      <br></br>
      <input clsaaName="form-control " type="text" id="title" name='title' value={post.title} onChange={e=>onInputchange(e)}  />
      <br></br>
      <label >DESCRIPTION:</label>
      <br></br>
      <textarea clsaaName="form-control" name='description' id='description'value={post.description} onChange={e=>onInputchange(e)}  />
      <br></br>
    <select name='category' id="categoty" value={post.category} onChange={e=>onInputchange(e)}>
    <option value="">Select Category</option>
      <option value="Politics">Politics</option>
      <option  value="Entertainment">Entertainment</option>
      <option value="Sports">Sports</option>
      <option value="Other">Other</option>
    </select>
    <br></br>
    <label>Choose Img</label>
    <input type="file"  onChange={e => setImg(e.target.files[0])}/>
    <div className='text-center'>
    <button className='btn btn-dark fw-bold' type='submit'>POST</button> 
    </div>
    </form>
      </div>
    </div>
</div>
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        Do you want logOut?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-dark" onClick={()=>{signOut(auth);navigate("/login")}}>Ok</button>
      </div>
    </div>
  </div>
</div>
<ToastContainer/>
    </>
  )
}

export default Admin


