import React, { useEffect, useState } from 'react';
import "./App.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Timestamp } from 'firebase/firestore';
import { useParams} from "react-router-dom"
import {db} from "./firebase";
import {doc,getDoc, collection,updateDoc} from "firebase/firestore"


const EditNews = () => {
    const {id} = useParams()
  const postCollectionRef = collection(db, "news")
  let navigate = useNavigate();
  const [post , setpost]= useState({
    title:"",
    description:"" ,
    category:"",
    date : Timestamp.now().toDate()
  })
 
  useEffect(()=>{
    id && getNewsDetail()
  },[id])

  const getNewsDetail = async()=>{
    const docRef = doc(db, "news", id);
    const snapshot = await getDoc(docRef);
    if(snapshot.exists()){
        setpost({...snapshot.data()})
    }
  }
 
const onInputchange= (e)=>{
  setpost({...post, [e.target.name]:e.target.value})
  
}
const onSubmit =async (e)=>{
  e.preventDefault();
  if( post.category && post.description && post.title){
  await updateDoc(doc(postCollectionRef,id),{...post}).then(()=>{
            toast.success("News post edited successfully",{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              })
         })
       navigate("/feed");
  }else{
    toast.info("Please fill all fields",{
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
<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
  <div className='container-fluid'>
    <a href="" className='navbar-brand'>FASTNEWS</a>
    <ul className='navbar-nav '>
      <li className='nav-item '><NavLink className='nav-link'to="/feed">Post</NavLink>
      </li>
      </ul>
</div>
</nav>
<div className='container'>
<h1 className=" text-center mt-4 fw-bold"> EDIT NEWS DETAILS</h1>
    <div className='row justify-content-center p-3'>
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
    <div className='text-center'>
    <button className='btn btn-dark fw-bold' type='submit'>Edit</button> 
    </div>
    </form>
      </div>
    </div>
</div>


<ToastContainer/>
    </>
  )
}

export default EditNews


