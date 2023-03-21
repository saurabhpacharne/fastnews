import React from 'react'
import Admin from './Admin'
import Feed from './Feed';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import UserAuthProvider from './contex';
import ProtectedRoute from './ProtectedRoute';
import EditNews from './EditNews';
import User from './User';
import UserLogOut from './UserLogOut';




const App = () => {
  return (
   <>
  <UserAuthProvider>
   <BrowserRouter>
   <Routes>
    <Route exact path ="/admin" element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
    <Route exact path ="/feed" element={<ProtectedRoute><Feed/></ProtectedRoute>}/>
    <Route exact path ="/edit/:id" element={<ProtectedRoute><EditNews/></ProtectedRoute>}/>
    <Route exact path ="/" element={<User/>}/>
    <Route exact path ="/logout" element={<UserLogOut/>}/>
    <Route exact path ="/login" element={<Login/>}/>
    <Route exact path ="/register" element={<Register/>}/>
   </Routes>
   </BrowserRouter>
   </UserAuthProvider>
   </>
  )
}

export default App