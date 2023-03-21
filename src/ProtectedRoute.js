
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAuth } from './contex';


const ProtectedRoute = ({children}) => {
    let navigate = useNavigate()
    const {user} = useContext(userAuth)
    if(user.email!=="saurabhpacharne007@gmail.com" ){
        return navigate("/")
    }


  return children
    
  
}

export default ProtectedRoute