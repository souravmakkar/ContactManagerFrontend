import {useState} from 'react';

import validateInfo from '../../validateInfo';

const useForgotPassword =(props)=>{

const [errors,setErrors] = useState({});
const [isSubmitted,setIsSbmitted] =useState(false);

  const handleSubmit=(e)=>{
    e.preventDefault();
    setErrors(validateInfo(props));
    setIsSbmitted(!isSubmitted);
  };

  return { handleSubmit,errors,isSubmitted};

}

export default useForgotPassword;