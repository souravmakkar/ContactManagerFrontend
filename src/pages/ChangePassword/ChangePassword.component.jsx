import React,{useState} from 'react';
import PasswordStrength from '../../components/PasswordStrengthIndicator/PasswordStrength.component';
import './ChangePassword.style.css';

const isNumberRegx = /\d/;
const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
//!@#$%&*()'+,-./:;<=>?[]^_`{|}
function ChangePassword() {

  const [passwordShown,setPasswordShown] = useState(false);
  const[passwordFocused,setPasswordFocused] =useState(false);
  const [password, setPassword] = useState('');
  const [passwordValidity, setPasswordValidity] = useState({
    minChar : null,
    number : null,
    specialChar : null
})
 
  const togglePasswordVisbility = ()=>{
    setPasswordShown(!passwordShown);
  }

  const onChangePassword = (password) =>{
   setPassword(password);
   setPasswordValidity({
     minChar:password.length>=8 ? true : false,
     number:isNumberRegx.test(password) ? true : false,
     specialChar : specialCharacterRegx.test(password) ? true : false
   })
  }

  return (
    <div className='wrapper'>
      <div className={`card change_password_card ${passwordFocused ? 'large':'normal'}`}>
           <h2>Change your password</h2>
            <div className='form-inputs'>
                <input
                className='input'
                type='password'
                id='password'
                name='oldPassword'
                autoFocus
                placeholder='Enter old password'
                />
           </div>
           <div className='form-inputs'>
                <input
                className='input'
                type={ passwordShown ? 'text':'password'}
                id='newPassword'
                name='newPassword'
                value={password}
                onFocus={()=>setPasswordFocused(true)}
                onChange={ (e)=> onChangePassword(e.target.value)}
                placeholder='Enter new password'
                />
                <i className={`fa ${passwordShown ? "fa-eye-slash":"fa-eye"} password-icon`} 
                onClick={togglePasswordVisbility} />
           </div>
           {
             passwordFocused && <PasswordStrength {...passwordValidity}/>
           }  
           <button type='submit' className='success' >
             Change Password
            </button>
      </div>      
    </div>
   )
  }  
export default ChangePassword
