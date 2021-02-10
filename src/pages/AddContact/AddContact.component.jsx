import React,{useEffect} from 'react';
import swal from 'sweetalert';

import './AddContact.style.css'
import useContactDetails from './useContactDetails';
import UserService from '../../services/userService';

function AddContact() {
  const { handleContactForm,
      handleChange,imageHandler,errors,errorsImage,isSubmitted,
      contactDetails,imageName,imageSelected
      } = useContactDetails();

      useEffect(
        () => {
          if (Object.keys(errors).length === 0 && isSubmitted
              && Object.keys(errorsImage).length === 0 ) {
            UserService.submitContactDetails(contactDetails,imageSelected)
                  .then((response)=>{
                    swal({
                      title: "Added!",
                      text: "Contact added Successfully.",
                      icon: "success",
                      button: "okh",
                    });
                    console.log(response);
                    console.log(response.data);
                 })
             .catch((error)=>{
               console.log(error);
               console.log(error.response);
             });
                 }
        },
        [errors]
      )
      
  return (
    <div className='wrapper add_contact_wrapper'>
      <div className={`card ${Object.keys(errors).length === 0 ? 'add_contact_card':'add_contact_card large'}`}>
         <h1 className='heading'>Add Contact</h1>  
         <form onSubmit={handleContactForm} > 
          <div className="form-inputs">
               <label className='form-label' htmlFor='username'>
               Enter name here
              </label>
              <input
                type='name'
                name='name'
                className='input'
                placeholder='Enter here'
                required
                value={contactDetails.name}
                onChange={handleChange}
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
                required
                value={contactDetails.secondName}
                onChange={handleChange}
                />
             {errors.secondName && <p className='error-popup'>{errors.secondName}</p>}

           </div> 

           {/* Phone no */}
           <div className="form-inputs">
              <label className='form-label' htmlFor='username'>
                  Enter phone number
              </label>
               <input
                  type='number'
                  className="input"
                  name='phoneNo'
                  placeholder='Enter here'
                  required
                  value={contactDetails.phoneNo}
                  onChange={handleChange}
                />
               {errors.phoneNo && <p className='error-popup'>{errors.phoneNo}</p>}
           </div> 
           {/* Email */}
           <div className="form-inputs">
             <label className='form-label' htmlFor='username'>
             Enter email here
                </label>
                  <input
                    type='text'
                    name='email'
                    className='input'
                    placeholder='Enter here'
                    required
                    value={contactDetails.email}
                    onChange={handleChange}
                />
                {errors.email && <p className='error-popup'>{errors.email}</p>}
            </div>

             {/* Work */}
             <div className="form-inputs">
                <label className='form-label' htmlFor='username'>
                   Enter your work
                </label>
                      <input
                        type='text'
                        name='work'
                        className='input'
                        placeholder='Enter here'
                        required
                        value={contactDetails.work}
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
                      required
                      value={contactDetails.description}
                      onChange={handleChange}
                      />
                </div>
           {/* Image Field */}
              <div className='form-inputs contact-image'>
                <input type="file" name='image' className="file-input" onChange={imageHandler}/>
                {errorsImage.image && <p className='error-popup'>{errorsImage.image}</p>}
                <span className='image-name'>{imageName}</span>
              </div>

            <button type='submit' className='success' onClick={handleContactForm}>Save Contact</button>
          </form>
       </div>
   </div> 
  )
}

export default AddContact
