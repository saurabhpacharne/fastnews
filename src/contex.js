import { createContext, useEffect, useState } from "react";
import {app} from "./firebase"
import {onAuthStateChanged, getAuth} from "firebase/auth"

 export const userAuth = createContext()
 const auth = getAuth(app)

export default function UserAuthProvider({children}){

    const [user, setUser]= useState("");


    useEffect(()=>{
        const unsubcribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        });
        return ()=>{
            unsubcribe();
        }
    },[])
    return(
        <userAuth.Provider value={{user}}>
            {children}
        </userAuth.Provider>
    )
}