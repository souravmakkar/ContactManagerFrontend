import React,{ useState,useEffect} from 'react';

import './SignUp.style.css';

import useForm from './useForm';
import AuthService from '../../services/auth.service'
import SuccessfulSignup from '../../components/SuccessfulSignup/SuccessfulSignup.component';

function SignUp() {
  const [signUpError,SetSignUpError] =useState('');
  const [successfulSignup,setSuccesfulSignUp] =useState(false);
  const [signUpUser,setSignUpUser] =useState('');
  
  const { values,handleChange,handleSubmit,errors,resetData,isSubmitted } = useForm();

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitted ) {
       AuthService.register({...values})
          .then((response) =>{
            console.log(response.data);
            setSignUpUser(response.data)
            setSuccesfulSignUp(!successfulSignup);
                })
          .catch(error =>{
            console.log(error.response);
            SetSignUpError(error.response.data['message']);
          });    
      }
    },
    [errors]
  );

  return (
  <>
    <form className='form-wrapper'>
    <div className='form-container'>
       {
         (successfulSignup) ?
            <SuccessfulSignup  user={signUpUser}/>
            :(
          <>    
        <h3 className='error-message'>{signUpError}</h3>
          <div className='title'>Register here</div>
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
              {/* Errors contains the name then and is executed */}
              {errors.name && <p className='error-popup'>{errors.name}</p>}
           </div>     
           <div className='form-inputs'>
              <label className='form-label' htmlFor='email'>
                Email
              </label>
              <input
                className='input'
                type='email'
                id='email'
                name='email'
                value={values.email}
                onChange={handleChange}
                placeholder='Enter here'
                />
         {errors.email && <p className='error-popup'>{errors.email}</p>}

           </div>  
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
              />
         {errors.confirmPassword && <p className='error-popup'>{errors.confirmPassword}</p>}
           </div>  
              <div className="form-inputs">
                <label htmlFor='description' className='form-label'>About</label>
                  <textarea 
                  className='input'
                  id="description" 
                  name="about" rows="4" cols="10"
                  value={values.about}
                  onChange={handleChange}
                  />   
         {errors.about && <p className='error-popup'>{errors.about}</p>}
              </div>   
              
          <div className='form-buttons'>
            <button type='submit' className='success' onClick={handleSubmit}>Submit</button>  
            <button type='submit' className='warning' onClick={resetData}>Reset</button>  
          </div>
      </>    
           )}
     </div>         {/* form container Ends    */}
  </form>     
</>
  )
}

export default SignUp
