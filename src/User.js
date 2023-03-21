import React, { useEffect, useState } from 'react';
import "./App.css"
import { collection, query, orderBy, onSnapshot, where} from "firebase/firestore"
import {db} from "./firebase"
import UserNewsCard from './UserNewsCard';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { userAuth } from './contex';


const User = () => {
  const [post, setPost]= useState([])
  const collectinRef = collection(db, "news")
  const {user} = useContext(userAuth)
 
  const getAllPost = ()=>{
    const q = query(collectinRef,orderBy("date","desc"));
      onSnapshot(q,(snapShot)=>{
      const allPost = snapShot.docs.map((doc)=>({
        id : doc.id,
        ...doc.data()
      }));
      setPost(allPost)
    })
  }
  useEffect(()=>{
    getAllPost();
  },[])
  const getPoliticsNews= ()=>{
    const q = query(collectinRef,where("category", "==", "Politics"));
    onSnapshot(q,(snapShot)=>{
      const allPost = snapShot.docs.map((doc)=>({
        id : doc.id,
        ...doc.data()
      }));
      setPost(allPost)
    })
  }
  const getSportNews= ()=>{
    const q = query(collectinRef,where("category", "==", "Sports"));
    onSnapshot(q,(snapShot)=>{
      const allPost = snapShot.docs.map((doc)=>({
        id : doc.id,
        ...doc.data()
      }));
      setPost(allPost)
    })
  }
  const getOtherNews= ()=>{
    const q = query(collectinRef,where("category", "==", "Other"));
    onSnapshot(q,(snapShot)=>{
      const allPost = snapShot.docs.map((doc)=>({
        id : doc.id,
        ...doc.data()
      }));
      setPost(allPost)
    })
  }
  const getEnterTainNews= ()=>{
    const q = query(collectinRef,where("category", "==", "Entertainment"));
    onSnapshot(q,(snapShot)=>{
      const allPost = snapShot.docs.map((doc)=>({
        id : doc.id,
        ...doc.data()
      }));
      setPost(allPost)
    })
  }
  const getAllNews = ()=>{
    getAllPost()
  }
    
  return (
   <>
   {
    (user && user!=="saurabhpacharne007@gmail")?<nav className='navbar navbar-expand-lg navbar-dark bg-dark sticky-top'>
    <div className='container-fluid'>
      <a href="" className='navbar-brand'>FASTNEWS</a>
      <button className='navbar-toggler' type='button' data-bs-toggle="collapse"data-bs-target="#myNav">
        <span className="navbar-toggler-icon"></span>
        </button>
     <div className="collapse navbar-collapse text-center" id="myNav">
     <ul className='navbar-nav ms-auto'>
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Category
            </a>
            <ul className="dropdown-menu ">
              <li><a className="dropdown-item " type='button' value="Entertainment"onClick={getEnterTainNews}>Entertainmeent</a></li>
              <li><a className="dropdown-item" type='button'onClick={getSportNews}>Sports</a></li>
              <li><a className="dropdown-item" type='button' onClick={getPoliticsNews}>Politics</a></li>
              <li><a className="dropdown-item" type='button'onClick={getOtherNews}>Other</a></li>
              <li><a className="dropdown-item" type='button'onClick={getAllNews}>Get All News</a></li>
            </ul>
          </li>   
          <li className='nav-item '><NavLink className='nav-link'to="/logout">{user.email}</NavLink></li>    
        </ul>
     </div>
  </div>
  </nav>:<nav className='navbar navbar-expand-lg navbar-dark bg-dark sticky-top'>
    <div className='container-fluid'>
      <a href="" className='navbar-brand'>FASTNEWS</a>
      <button className='navbar-toggler' type='button' data-bs-toggle="collapse"data-bs-target="#myNav">
        <span className="navbar-toggler-icon"></span>
        </button>
     <div className="collapse navbar-collapse text-center" id="myNav">
     <ul className='navbar-nav ms-auto'>
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Category
            </a>
            <ul className="dropdown-menu ">
              <li><a className="dropdown-item " type='button' value="Entertainment"onClick={getEnterTainNews}>Entertainmeent</a></li>
              <li><a className="dropdown-item" type='button'onClick={getSportNews}>Sports</a></li>
              <li><a className="dropdown-item" type='button' onClick={getPoliticsNews}>Politics</a></li>
              <li><a className="dropdown-item" type='button'onClick={getOtherNews}>Other</a></li>
              <li><a className="dropdown-item" type='button'onClick={getAllNews}>Get All News</a></li>
            </ul>
          </li>   
          <li className='nav-item '><NavLink className='nav-link'to="/login">login</NavLink></li>    
        </ul>
     </div>
  </div>
  </nav>
  
   }
  
{
    post.map((val)=>{
        return(
            <>
         <div key={val.date}>  <UserNewsCard {...val} /></div>
            </>
        )
    })
} 

   </>
  )
}

export default User