import React from 'react';
import './PasswordStrength.style.css';

function PasswordStrength({ minChar, number, specialChar }) {
  return (
    <div className='password-indicator'>
         <p>Password must contain:</p>
           <ul>
            <PasswordStrengthItem isValid={minChar} text="Have at least 8 characters"/>
            <PasswordStrengthItem isValid={number} text="Have at least 1 number"/>
            <PasswordStrengthItem isValid={specialChar} text="Have at least 1 special character"/>
          </ul>
      </div>   
  )
}

const PasswordStrengthItem = ({ isValid, text}) =>{
  const highlightClass = isValid
        ? "text-success"
        : isValid !== null //false && null on initial
        ? "text-danger"
        : "";
    return <li className={highlightClass}>{text}</li>;
}

export default PasswordStrength
