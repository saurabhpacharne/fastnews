import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css"
import { NavLink} from 'react-router-dom';

const Feed = () => {
    
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

const getEntertainment=async()=>{
const res = await axios.get("http://localhost:3005/news")
const data = (res.data).filter((val)=>val.category=="Entertainment")
setPost(data)
}
const getPolitics=async()=>{
  const res = await axios.get("http://localhost:3005/news")
  const data = (res.data).filter((val)=>val.category=="Politics")
  setPost(data)
  }
  const getSports=async()=>{
    const res = await axios.get("http://localhost:3005/news")
    const data = (res.data).filter((val)=>val.category=="Sports")
    setPost(data)
    }
    const getAll =()=>{
      getAllAPost()
    }
    let date = new Date();
    let day = `${date.getDate()<10?"0":""}${date.getDate()}`
    let month = `${(date.getMonth()+1)<10?"0":""}${date.getMonth()+1}`
    let year = date.getFullYear();
    const todaysDate = `${day}/${month}/${year}`
    
  return (
   <>
   <nav className='navbar navbar-expand-lg navbar-dark bg-dark sticky-top'>
  <div className='container-fluid'>
    <a href="" className='navbar-brand'>FASTNEWS</a>
    <ul className='navbar-nav '>
      <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Category
          </a>
          <ul className="dropdown-menu ">
            <li><a className="dropdown-item " type='button'onClick={()=>getEntertainment()}>Entertainment</a></li>
            <li><a className="dropdown-item" type='button'onClick={()=>getSports()}>Sports</a></li>
            <li><a className="dropdown-item" type='button'onClick={()=>getPolitics()}>Politics</a></li>
            <li><a className="dropdown-item" type='button'onClick={()=>getAll()}>Get All News</a></li>
          </ul>
        </li>
        <li className='nav-item '><NavLink className='nav-link'to="/admin">Create Post</NavLink>
      </li>
      </ul>
</div>
</nav>

{
    post.map((val)=>{
        return(
            <>
            <div className='row mt-4 '>
    <div className='col-lg-7 col-md-9 col-sm-12 p-2' style={{margin:"auto"}}>
    <div className="card shadow-lg p-2">
  <img src={val.image} className="card-img-top" style={{height:"400px"}}/>
  <div className="card-body">
    <h5 className="card-title">{val.title}</h5>
    <p className="card-text">{val.description}.</p>
   <div>
   <NavLink to="/feed"><button className='btn btn-danger me-2' style={{width:"50px"}} onClick={()=>deletePost(val.id)}><span className="material-symbols-outlined"  style={{width:"30px"}}>
delete
</span></button></NavLink>
    <NavLink to={`/edit/${val.id}`}><button className='btn btn-warning' style={{width:"50px"}}><span className="material-symbols-outlined" style={{width:"30px"}}>
edit_note
</span></button></NavLink>
<span className='d-flex justify-content-end '>{todaysDate}</span>
   </div>
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