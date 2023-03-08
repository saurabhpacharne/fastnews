import React, { useEffect, useState } from 'react';
import "./App.css";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';



const Edit = () => {
    const {id}= useParams();
    let navigate= useNavigate();
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
await axios.put(`http://localhost:3005/news/${id}`,post);
setpost({
  title:"",
  description:"",
  image: ""
})
navigate("/feed")

}
const loadPost=async()=>{
    const result = await axios.get(`http://localhost:3005/news/${id}`)
    setpost(result.data)
   
}
useEffect(()=>{
    loadPost()
},[])


  return (
    <>
    <nav className="navbar sticky-top">
  <div className="container-fluid">
    <a className="navbar-brand ">FASTNEWS</a>  
  </div>
</nav>
<div className='row'>
  <div className='col-8 shadow mt-4' id='box'>
    <h1 className='text-center mt-3'>ADD NEWS DETAILS </h1>
    <form className="form" onSubmit={e=>onSubmit(e)} >
      <label >TITLE:</label>
      <br></br>
      <input type="text" id="title" name='title' value={title} onChange={e=>onInputchange(e)}  />
      <br></br>
      <label >DESCRIPTION:</label>
      <br></br>
      <textarea name='description' id='description'value={description} onChange={e=>onInputchange(e)}  />
      <br></br>
    <select name='category' id="categoty" value={category} onChange={e=>onInputchange(e)}>
      <option value="Politics">Politics</option>
      <option  value="Entertainment">Entertainment</option>
      <option value="Sports">Sports</option>
    </select>
    <br></br>
    <label>Paste img address here</label>
    <br></br>
    <input type="text" name='image' id = "image" value={image}  onChange={e=>onInputchange(e)}/>
    <div className='text-center'>
    <button className='btn btn-success' type='submit'>Post</button> 
    </div>
    
    </form>

  </div>

</div>
    </>
  )
}

export default Edit