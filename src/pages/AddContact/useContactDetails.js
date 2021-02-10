import {useState} from 'react';
import validateInfo from '../../validateInfo';
import {imageValidate} from '../../validateInfo';
// import ContactValidate from './ContactValidate'

const useContactDetails =() =>{
  const[imageName,setImageName] = useState('');
  const[imageSelected,setImageSelected] = useState();
  const[contactDetails,setContactDetails] = useState({
    name:'',
    secondName:'',
    email:'',
    phoneNo:'',
    work:'',
    description:'',
  });

  const [errors,setErrors] = useState({});
  const [errorsImage,setErrorsImage] = useState({});

 const [isSubmitted,setIsSubmitted] =useState(false);

  const handleContactForm =(e) =>{
    e.preventDefault(); 
    setErrors(validateInfo(contactDetails));
    setErrorsImage(imageValidate(imageSelected));
    setIsSubmitted(!isSubmitted);
  }

  const imageHandler=(e)=>{
    if(e.target.files[0]){
      setImageName(e.target.files[0]['name']);
      setImageSelected(e.target.files[0]);
    }
    else{
    setImageSelected('');
    }
  };



  const handleChange=(e) =>{
    const {name,value} = e.target;
    setContactDetails({
      ...contactDetails,
      [name]:value
    });
  };


  return {handleContactForm,handleChange,imageHandler,
    errors,errorsImage,isSubmitted,imageName,contactDetails,imageSelected}
}

export default useContactDetails;