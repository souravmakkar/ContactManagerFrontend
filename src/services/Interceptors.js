import axios from 'axios';
import base_url from '../api/bootapi';

const tokenObj = JSON.parse(localStorage.getItem('User'));
// console.log(tokenObj);
let authAxios = axios.create({
  baseURL:base_url})
  
if(tokenObj){
   authAxios = axios.create({
    baseURL:base_url,
    headers:{
      Authorization:`Bearer ${tokenObj['jwt']}`
    }
    });
  } 

export default authAxios;