import React,{useState,useEffect} from 'react';
import swal from 'sweetalert';

import useForgotPassword from '../ForgotPassword/useForgetPassword';
import './ResetPassword.style.css';
import AuthService from '../../services/auth.service';

function ResetPassword({location,history}) {

  const[values,setValues] = useState({
    password:'',
    confirmPassword:''
  });
  const [isError,setIsError] = useState(false);

  const search = location.search;   // could be '?token=bar'
  const params = new URLSearchParams(search)
   let token = params.get('token');

  const handleChange=(e)=>{
    const{name,value}=e.target;
    setValues({
      ...values,
      [name]:value
    })
  };

  const { handleSubmit,errors,isSubmitted}= useForgotPassword(values);

  useEffect(
    () => {
      AuthService.resetTokenCheck(token)
      .then((response)=>{
        // console.log(response.data);
     })
     .catch((error)=>{
      //  console.log(error.response);
      // console.log((error.response.data['message']));
      setIsError(true)
     });
    },[token])


useEffect(()=>{
  if (Object.keys(errors).length === 0 && isSubmitted ) {
  AuthService.resetYourPassword(values,token)
  .then((response)=>{
    // console.log(response);
    // console.log(response.data);
    swal({
      text: response.data,
      icon: "success",
      button: "Okh",
    }).then(function() {
      window.location.href = "/signin";
      console.log('The Ok Button was clicked.');
      });
    // history.push('/signin')
  })
  .catch((error)=>{
    console.log(error.response);
   console.log((error.response.data['message']));
   setIsError(true)
  });
  }
},[errors])

// console.log(passwordIsSubmitted);
// console.log(isError);
  
  return( 
    <>
    {
      isError ?
          <div className='reset_error'>
            <h1>Invalid Token</h1>
            <p>Please enter valid link from email</p>
          </div>
          :(
            <div className=' wrapper reset_wrapper'>
            <div className='card reset_card '>
              <h2>Reset Password</h2>
              <div className='form-inputs'>
                  <label className='form-label' htmlFor='password'>
                    Password
                  </label>
                  <input
                  className='input'
                  type='password'
                  id='password'
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  placeholder='Enter here'
                  required
                  autoFocus
                  />
               {errors.password && <p className='error-popup'>{errors.password}</p>}
               </div>  
               <div className='form-inputs'>
                  <label className='form-label' htmlFor='confirmPassword'>
                    Confirm Password
                  </label>
                  <input
                  className='input'
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  value={values.confirmPassword}
                  onChange={handleChange}
                  placeholder='Enter here'
                  required
                  />
              {errors.confirmPassword && <p className='error-popup'>{errors.confirmPassword}</p>}
               </div>  
     
               <button type='submit' className='warning' onClick={handleSubmit}>
                     Reset Password
               </button>
            </div>
          </div>
          )
    }
    
  </>
  )
}

export default ResetPassword
