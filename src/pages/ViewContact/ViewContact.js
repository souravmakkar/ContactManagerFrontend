import React,{useState,useEffect} from 'react';

import './ViewContact.style.css';
import UserService from '../../services/userService';
import swal from 'sweetalert';
function ViewContact({match,history}) {

  const [singleContact,setSingleContact] =useState({});
  let id = match.params["id"];

  const getSingleContact = () =>{
    UserService.getSingleContact(id)
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

  
  const deleteContact =({id})=>{
    swal({
      title: "Are you sure?",
      text: "You want to delete this contact!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        console.log(id);
        UserService.deleteContact(id)
      .then(()=>{
        swal("Your contact has been deleted!", {
          icon: "success",
        });
        history.push('/user/show-contacts')
      })
      .catch((error)=>{
        console.log(error);
      });
      }
       else {
        swal("Your contact  is safe!");
      }
    });
   }

  // console.log(singleContact);

  return (
    <>
      {/* Single Contact of id is :- */}
      {/* {
             props.match.params.id 
       } */}
       <div className='wrapper show_contact_wrapper'>
          <div className='card show_contact_card'>
            <div className='contact_image ' />
            <h1 className='contact_name'> {singleContact.name} <span> ( {singleContact.secondName} )</span></h1>
            <hr className='line'/>
            <h3 className='email'>
              <span>Email </span>
              {singleContact.email}
            </h3> 
            <hr className='line'/>
            <h3 className='Upper'>
              <span>Work</span>
              {singleContact.work}
             </h3> 
            <hr className='line'/>
            <h3>
              <span>Phone No </span>
              {singleContact.phoneNo}
            </h3> 
            <hr className='line'/>
            <h3 className='Upper'>
              <span>Description </span>
              {singleContact.description ? singleContact.description:'NaN'}
            </h3> 
            <hr className='line'/>
            <button type='submit' className='warning' onClick={()=>deleteContact(singleContact)}>Delete</button>
  
          </div>
        
        </div>
       

      
    </>
  )
}

export default ViewContact
