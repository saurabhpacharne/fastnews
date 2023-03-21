import { deleteDoc, doc } from 'firebase/firestore';
import React, { useState , useEffect} from 'react'
import { useContext } from 'react';
import { userAuth } from './contex';
import { db, storage } from './firebase';
import {deleteObject, ref} from "firebase/storage"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserNewsCard = ({...val}) => {
    const [url, setUrl] = useState(null)
    const {getImgUrl} = useContext(userAuth)
    useEffect(()=>{
        getImgUrl(val.imgRef).then((url)=>setUrl(url))
    },[])
    
  return (
    <>
     <div className='row mt-4 p-1' >
    <div className='col-lg-7 col-md-9 col-sm-12' style={{margin:"auto"}}>
    <div className="card shadow-lg" >
  <img src={url} className="card-img-top" style={{height:"400px"}}/>
  <div className="card-body">
    <h5 className="card-title">{val.title}</h5>
    <p className="card-text">{val.description}.</p>
    <div>
    <span className='d-flex justify-content-end'>{val.date.toDate().toDateString()}</span>
    </div>
  </div>
</div>
   </div>
</div>
<ToastContainer/>
    </>
    
  )
}

export default UserNewsCard