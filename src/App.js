import React from 'react'
import Admin from './Admin'
import Feed from './Feed';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Edit from './Edit';


const App = () => {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route exact path ="/" element={<Admin/>}/>
    <Route exact path ="/feed" element={<Feed/>}/>
    <Route exact path ="/edit/:id" element={<Edit/>}/>
   </Routes>
   </BrowserRouter>
   </>
  )
}

export default App