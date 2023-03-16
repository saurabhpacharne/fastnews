import React from 'react'
import Admin from './Admin'
import Feed from './Feed';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Edit from './Edit';
import Login from './Login';
import Register from './Register';
import UserAuthProvider from './contex';
import ProtectedRoute from './ProtectedRoute';




const App = () => {
  return (
   <>
  <UserAuthProvider>
   <BrowserRouter>
   <Routes>
    <Route exact path ="/admin" element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
    <Route exact path ="/feed" element={<ProtectedRoute><Feed/></ProtectedRoute>}/>
    <Route exact path ="/edit/:id" element={<ProtectedRoute><Edit/></ProtectedRoute>}/>
    <Route exact path ="/" element={<Login/>}/>
    <Route exact path ="/register" element={<Register/>}/>
   </Routes>
   </BrowserRouter>
   </UserAuthProvider>
   </>
  )
}

export default App