import {useState } from 'react';
import {signup} from '../../DataForFields';

function Input(props) {


  signup.map(({inputClass,name,id,placeholder,type})=>{
    return (
      <div className='form-inputs'>
      <label className='Label'>{props.label}</label>
       <input type={type} name={name} 
       id={id} placeholder ={placeholder}
       />
    </div>
    )
  })
 

  return (
    <div>
      
    </div>
  )
}

export default Input;
