import React,{useEffect} from 'react';
import AuthService from '../../services/auth.service';

function SignOut() {

  useEffect(()=>{
   logOut();
  },[])
  
  const logOut =()=>{
    AuthService.logout();
  }
  return (
    <div>
      
    </div>
  )
}

export default SignOut
