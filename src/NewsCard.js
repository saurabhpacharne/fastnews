import { deleteDoc, doc } from 'firebase/firestore';
import React, { useState , useEffect} from 'react'
import { useContext } from 'react';
import { userAuth } from './contex';
import { db, storage } from './firebase';
import {deleteObject, ref} from "firebase/storage"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from 'react-router-dom';
const NewsCard = ({...val}) => {
    const [url, setUrl] = useState(null)
    const {getImgUrl} = useContext(userAuth)
    useEffect(()=>{
        getImgUrl(val.imgRef).then((url)=>setUrl(url))
    },[])
    
    const getNewsDelete= async(id)=>{
      try{
        await  deleteDoc(doc(db,"news",id))
        toast.success("News post deleted successfully",{
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        const storageImg = ref(storage,val.imgRef)
        await deleteObject(storageImg)
      }catch{
        toast.warning("Somthing went wrong",{
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
     <div className='row mt-4 p-1' >
    <div className='col-lg-7 col-md-9 col-sm-12' style={{margin:"auto"}}>
    <div className="card shadow-lg" >
  <img src={url} className="card-img-top" style={{height:"400px"}}/>
  <div className="card-body">
    <h5 className="card-title">{val.title}</h5>
    <p className="card-text">{val.description}.</p>
    <div>
    <NavLink className='bg-danger text-white btn me-2' onClick={()=>getNewsDelete(val.id)} style={{width:"50px"}}><span className="material-symbols-outlined text-center">delete</span></NavLink>
    <NavLink className='bg-warning text-white btn' to={`/edit/${val.id}`} style={{width:"50px"}}><span className="material-symbols-outlined text-center">edit</span></NavLink>
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

export default NewsCard