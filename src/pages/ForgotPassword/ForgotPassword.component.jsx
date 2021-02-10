import React,{useState,useEffect} from 'react';
import {BsFillLockFill} from 'react-icons/bs';
import useForgotPassword from './useForgetPassword';
import AuthService from '../../services/auth.service';

import './ForgotPassword.style.css';

function ForgotPassword(props) {
  const [message,setMessage] = useState('')
  const [isError,setIsError]=useState(false);
  const [validEmail,setValidEmail] =useState(false);
  const[errorMessage,setErrorMessage] = useState('')
  const[values,setValues] =useState({
    email:''
  });


  const handleChange=(e)=>{
    const{name,value}=e.target;
    setValues({
      [name]:value
    })
  };
 const{handleSubmit,errors,isSubmitted} = useForgotPassword(values);

 useEffect(
  () => {
    if (Object.keys(errors).length === 0 && isSubmitted ) {
      AuthService.forgotPassword(values)
            .then((response)=>{
          console.log(response);
          setMessage(response.data);
          setValidEmail(!validEmail);
       })
       .catch((error)=>{
         console.log(error.response);
        console.log((error.response.data['message']));
        setErrorMessage(error.response.data['message']);
        setIsError(true)
       });
           }
  },

  [errors]
)

  return (
    <div className='wrapper'>
      <div className="card forget_password_card">
      {  isError && <div className='danger'>{errorMessage}</div>}

        { validEmail && <div className='success'>{message}</div>}
    
          <div className="lock-icon">
              <BsFillLockFill />
            </div>
            <div className='form-inputs'>
                <input
                className='input'
                type='email'
                id='email'
                name='email'
                value={values.email}
                onChange={handleChange}
                autoFocus
                placeholder='Enter email here'
                />
               {errors.email && <p className='error-popup'>{errors.email}</p>}
           </div>  
           <button type='submit' className='success' onClick={handleSubmit}>
             Send Email
            </button>
      </div>      
    </div>
   )
  }  

export default ForgotPassword
