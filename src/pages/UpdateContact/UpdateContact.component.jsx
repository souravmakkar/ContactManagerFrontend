import React,{useState,useEffect} from 'react'
import userService from '../../services/userService';
import swal from 'sweetalert';

import './UpdateContact.style.css';

import ContactValidate from '../AddContact/ContactValidate';
import UserService from '../../services/userService';

function UpdateContact({match}) {

  // const {handleChange} = useContactDetails();
  const [singleContact,setSingleContact] =useState({});
  const [isSubmitted,setIsSubmitted] =useState(false);
  const[errors,setErrors]= useState({});

  let id = match.params["id"];

  const handleChange=(e) =>{
    const {name,value} = e.target;
    setSingleContact({
      ...singleContact,
      [name]:value
    });
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitted ) {
        
        UserService.updateSingleContact({...singleContact})
              .then((response)=>{
                swal({
                  title: "Updated!",
                  text: "Contact updated Successfully.",
                  icon: "success",
                  button: "okh",
                });
                console.log(response.data);
         })
         .catch((error)=>{
           console.log(error.response);
         });
             }
    },
    [errors]
  )


  const handleUpdateForm =(e)=>{
    e.preventDefault();
    checkforDefaultInput(singleContact)
    setErrors(ContactValidate(singleContact));
    setIsSubmitted(!isSubmitted);

  }

  const checkforDefaultInput =({description,secondName}) =>{
  singleContact['description'] = singleContact.description ? singleContact.description :'null';
  singleContact['secondName'] = singleContact.secondName ? singleContact.secondName :'null';
  }
  
  const getSingleContact = () =>{
    userService.getSingleContact(id)
    .then((response)=>{
      setSingleContact(response.data);
    })
    .catch((error)=>{
      console.log(error);
      console.log(error.message);
    });
  }

  useEffect(() => {
    getSingleContact()
  }, [])


  return (
    <div className='wrapper add_contact_wrapper'>
      <div className="card add_contact_card">
         <h1 className='heading'>Update Your Contact</h1>  
         <form > 
          <div className="form-inputs">
               <label className='form-label' htmlFor='username'>
               Enter name here {errors.name &&<span className='required'> *</span>}
              </label>
              <input
                type='name'
                name='name'
                className='input'
                placeholder='Enter here'
                value={singleContact.name}
                onChange={handleChange}
                required
                />
            {errors.name && <p className='error-popup'>{errors.name}</p>}    
        </div>  

           {/* Nick Name */}
         <div className="form-inputs" >
              <label className='form-label' htmlFor='username'>
              Enter nick name here
              </label>
              <input
                type='text'
                name='secondName'
                className='input'
                placeholder='Enter here'
                value={singleContact.secondName}
                onChange={handleChange}
                />
          </div> 

           {/* Phone no */}
           <div className="form-inputs">
              <label className='form-label' htmlFor='username'>
                  Enter phone number {errors.phoneNo &&<span className='required'> *</span>}
              </label>
               <input
                  type='number'
                  className="input"
                  name='phoneNo'
                  placeholder='Enter here'
                  required
                  value={singleContact.phoneNo}
                  onChange={handleChange}
                />
            {errors.phoneNo && <p className='error-popup'>{errors.phoneNo}</p>}
              
           </div> 
           {/* Email */}
           <div className="form-inputs">
            <label className='form-label' htmlFor='username'>
            Enter email here {errors.email &&<span className='required'> *</span>}
                </label>
                  <input
                    type='text'
                    name='email'
                    className='input'
                    placeholder='Enter here'
                    required
                    value={singleContact.email}
                    onChange={handleChange}            
                />
            {errors.email && <p className='error-popup'>{errors.email}</p>}
           </div>

             {/* Work */}
             <div className="form-inputs">
             <label className='form-label' htmlFor='username'>
             Enter your work {errors.work &&<span className='required'>*</span>}
              </label>
                      <input
                        type='text'
                        name='work'
                        className='input'
                        placeholder='Enter here'
                        required
                        value={singleContact.work}
                        onChange={handleChange}
                       />
            {errors.work && <p className='error-popup'>{errors.work}</p>}
             </div>

              {/* description */}
              <div className="form-inputs">
                <label htmlFor='description' className='form-label'>
                Enter contact description
                  </label>

                    <textarea
                      name='description'
                      className='input'
                      rows={10}
                      cols={200}
                      placeholder='Enter here'
                      value={ singleContact.description}
                      // ? singleContact.description:'NaN'
                      onChange={handleChange}
                      />
            {errors.description && <p className='error-popup'>{errors.description}</p>}
         
                </div>
            <button type='submit' className='success' onClick={handleUpdateForm}>Update Contact</button>
          </form>
       </div>
   </div> 
  )
}


export default UpdateContact
