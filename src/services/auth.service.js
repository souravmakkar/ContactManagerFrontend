// import {useState} from 'react';
import axios from 'axios';

import base_url from '../api/bootapi';

const getLoggedIn =() =>{
  const tokenInfo =JSON.parse(localStorage.getItem("User"));
  if(tokenInfo || tokenInfo === 'null'||tokenInfo==='undefined') 
   { 
     return true;
    }
  else{
    return false;
  }
}

const register = ({...values})=>{
  const user_object ={...values};
  return axios.post(`${base_url}/signup`,user_object)
}

const login =(name,password)=>{
  return axios.post(`${base_url}/login`,{name,password});
}

const logout =()=>{ 
  localStorage.removeItem("User");
  window.location.reload();
}

const getRole=()=>{
    const user =getCurrentUser();
   if(user.roles.includes("ROLE_USER")){
     return true;
   }
   else{
     return false;
   }
}

const getCurrentUser =()=>{
  return JSON.parse(localStorage.getItem('User'));
}

const forgotPassword=(email)=>{
  return axios.post(`${base_url}/forgot_password`,email)
}

const resetTokenCheck =(token)=>{
  return axios.get(`${base_url}/reset_password/?token=${token}`)
}

const resetYourPassword =(details,token)=>{
  const passwordDetails ={...details}
  return axios.post(`${base_url}/reset_password/?token=${token}`,passwordDetails)
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getLoggedIn,
  forgotPassword,
  getRole,
  resetTokenCheck,
  resetYourPassword
}

