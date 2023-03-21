import { createContext, useEffect, useState } from "react";
import {onAuthStateChanged, getAuth} from "firebase/auth"
import {collection, addDoc} from "firebase/firestore"
import {db,app} from "./firebase"
import {ref, uploadBytes, getStorage,getDownloadURL} from "firebase/storage"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 export const userAuth = createContext()
 const auth = getAuth(app)
 const storage = getStorage(app)
 const postCollectionRef = collection(db, "news")


export default function UserAuthProvider({children}){

    const [user, setUser]= useState("");

    const addNews = async(title, description,category, img,date)=>{
        const imgRef = ref(storage , `uploads/imges/${Date.now()}-${img.name}`);
        const uploadResult = await uploadBytes(imgRef, img)
        await addDoc(postCollectionRef,{title,description,category,
         imgRef: uploadResult.ref.fullPath,date}).then(()=>{
            toast.success("News post added successfully",{
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
    }
    
    const getImgUrl = (path)=>{
        return getDownloadURL(ref(storage, path))
    }
    useEffect(()=>{
        const unsubcribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        });
        return ()=>{
            unsubcribe();
        }
    },[])
    return(
       <>
        <userAuth.Provider value={{user, addNews, getImgUrl,  }}>
            {children}
        </userAuth.Provider>
        <ToastContainer/>
       </>
        
    )
}