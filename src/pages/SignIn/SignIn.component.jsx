import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import useButtonLoader from '../../components/useButtonLoader/useButtonLoader';

import './SignIn.style.css';

import useSignin from './useSignin';
import AuthService from '../../services/auth.service';

function SignIn(props) {
  const [loggedError,setLoggedError] =useState('');
  
const { values,handleChange,handleSubmit,errors,isSubmitted } = useSignin();

const [buttonElement,setLoading] =useButtonLoader("Login","Checking");

useEffect(
  () => {
    if (Object.keys(errors).length === 0 && isSubmitted ) {
      setLoading(true);
      AuthService.login(values.name,values.password)
            .then((response)=>{
          localStorage.setItem("User",JSON.stringify(response.data));
          props.history.push("/user/show-contacts")
          window.location.reload();
       })
       .catch((error)=>{
         setLoading(false);
         console.log(error.response);
        setLoggedError(error.response.data['message']);
       });
           }
  },
  [errors]
)


  return (
    <div className='signin-wrapper wrapper'>
      <div className="sigin-container card">
         <h3 className='error-message'>{loggedError}</h3>
        <h1 className='title'>Login Here</h1>
        <p>GET Access to your contacts After Login</p>
        <hr className='line'/>
         <form onSubmit={handleSubmit}> 
            <div className='form-inputs'>
            <label className='form-label' htmlFor='username'>
                Username
              </label>
              <input
                className='input'
                type='text'
                id='username'
                name='name'
                value={values.name}
                onChange={handleChange}
                placeholder='Enter here'
              />
     {errors.name && <p className='error-popup'>{errors.name}</p>}
            </div>  

              <div className='form-inputs'>
                  <label className='form-label' htmlFor='password'>
                  Password :
                  </label>
                  <input
                   className='input'
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Enter your password'
                    value={values.password}
                    onChange={handleChange}
                    />
       {errors.password && <p className='error-popup'>{errors.password}</p>}

              </div> 
              <div className="signin-button">
                <button type='submit' 
                className='success'
                ref={buttonElement}>
                  Login
                </button>
                <Link to='forgot_password' className='links'>Forgot your password?</Link>
              </div>
        </form>
     </div>
  </div>
  
  )
}

export default SignIn

