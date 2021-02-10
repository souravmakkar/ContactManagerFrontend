import {useState} from 'react';

import validateInfo from '../../validateInfo';

const useSignin =()=>{
  const[values,setValues] =useState({
    name:'',
    password:''
  })

const [errors,setErrors] = useState({});
const [isSubmitted,setIsSbmitted] =useState(false);

  const handleChange=(e)=>{
    const{name,value}=e.target;
    setValues({
      ...values,
      [name]:value
    })
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    setErrors(validateInfo(values));
   setIsSbmitted(!isSubmitted);
  };

  return { values,handleChange,handleSubmit,errors,isSubmitted};

}

export default useSignin;