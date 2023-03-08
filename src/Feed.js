import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css"
import { NavLink, useNavigate } from 'react-router-dom';

const Feed = () => {
  let navigate = useNavigate()
    const [post, setPost]=useState([]);
    useEffect(()=>{
getAllAPost();
    },[])

const getAllAPost =async()=>{
const result = await axios.get("http://localhost:3005/news");
setPost(result.data.reverse())
}

const deletePost = async(id)=>{
  axios.delete(`http://localhost:3005/news/${id}`)
  getAllAPost();

}

  return (
   <>
    <nav className="navbar sticky-top">
  <div className="container-fluid">
    <a className="navbar-brand">FASTNEWS</a>
    <div class="dropdown ms-end">
  <button class="btn dropdown-toggle fw-bold text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    category
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Sports</a></li>
    <li><a class="dropdown-item" href="#">Enternainment</a></li>
    <li><a class="dropdown-item" href="#">Politics</a></li>
  </ul>
</div>
    <NavLink to="/" className=" nav-link active fw-bold text-white ms-auto ">Create news</NavLink>
   
   </div>
</nav>
{
    post.map((val)=>{
        return(
            <>
            <div className='row mt-4 '>
    <div className='col-7' style={{margin:"auto"}}>
    <div className="card shadow-lg p-2">
  <img src={val.image} className="card-img-top" style={{height:"400px"}}/>
  <div className="card-body">
    <h5 className="card-title">{val.title}</h5>
    <p className="card-text">{val.description}.</p>
    <NavLink to="/feed"><button className='btn btn-danger me-2' style={{width:"50px"}} onClick={()=>deletePost(val.id)}><span className="material-symbols-outlined"  style={{width:"30px"}}>
delete
</span></button></NavLink>
    <NavLink to={`/edit/${val.id}`}><button className='btn btn-warning' style={{width:"50px"}}><span className="material-symbols-outlined" style={{width:"30px"}}>
edit_note
</span></button></NavLink>
  </div>
</div>
   </div>
</div>
            </>
        )
    })
}
   </>
  )
}

export default Feed