import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
const firebaseConfig = {
    apiKey: "AIzaSyChlOtYLH075bWGUMTZDGHpmY8cjJ4eOIE",
    authDomain: "myfirst-project-ecabd.firebaseapp.com",
    projectId: "myfirst-project-ecabd",
    storageBucket: "myfirst-project-ecabd.appspot.com",
    messagingSenderId: "1060105397385",
    appId: "1:1060105397385:web:e1cb81d9fff734e8c21258"
  };

   export const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app)
   export const storage = getStorage(app)