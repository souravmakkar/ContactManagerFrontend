import {useState} from 'react';

import validateInfo from '../../validateInfo';

const useForm = () =>{
  const [isSubmitted,setIsSubmitted]= useState(false);
  const [values,setValues] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
    about:''
  });

  const [errors,setErrors] = useState({});

  const handleChange=(e)=>{
    const{name,value} =e.target;
    setValues({
      ...values,
      [name]:value
    })
  };

  const handleSubmit =(e) =>{
    e.preventDefault();
    setErrors(validateInfo(values));
    setIsSubmitted(!isSubmitted);
  }
  
const resetData = () =>{
  setValues({
    name:'',
    email:'',
    password:'',
    about:''
  })
} 
  return { values,handleChange,handleSubmit,errors,resetData,isSubmitted };

}

export default useForm;