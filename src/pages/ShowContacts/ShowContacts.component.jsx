import React,{useState,useEffect} from 'react';
import {BiSearchAlt2} from 'react-icons/bi';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
// import {FcAlphabeticalSortingAz,FcAlphabeticalSortingZa} from 'react-icons/fc';
// import SweetAlert from 'sweetalert';

import './ShowContacts.style.css';
import UserService from '../../services/userService';
import Pagination from '../../components/Pagination/Pagination.component';


function ShowContacts(props) 
{
  const [contacts,setContacts] = useState([]);
  const [searchInput,setSearchInput] = useState('');
  const [currentPage,setCurrentPage] = useState(1);//2
  let contactsPerPage = 4;
  let indexOfFirstContact;
  let indexOfLastContact;
  let currentContacts;
  let contactCount;

  const getUserContacts = () =>{
    UserService.viewContacts()
    .then((response)=>{
      setContacts(response.data);
    })
    .catch((error)=>{
      console.log(error);
      console.log(error.message);
    });
  }

  useEffect(() => {
    getUserContacts()
  }, [])

  const handleSearchChange =(e)=>{
    e.preventDefault();
    setSearchInput(e.target.value)
    setCurrentPage(1);
 }

 if(searchInput.trim()){ //exists the value in search
  currentContacts = contacts.filter((contact) =>
         contact.name.toLowerCase().includes(searchInput.toLowerCase())
      );

    contactCount = currentContacts.length;
    indexOfLastContact = currentPage * contactsPerPage;
    indexOfFirstContact = indexOfLastContact - contactsPerPage;
    currentContacts = currentContacts.slice(indexOfFirstContact, indexOfLastContact);
 }
 else { //fetch contacts with paginations
  contactCount = contacts.length;
  indexOfLastContact = currentPage * contactsPerPage;
  indexOfFirstContact = indexOfLastContact - contactsPerPage;
  currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);
}
 
  const editContact =({id})=>{
  props.history.push(`/user/update/contact/${id}`);
  }

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
        UserService.deleteContact(id)
      .then(()=>{
        swal("Your contact has been deleted!", {
          icon: "success",
        });
        getUserContacts();
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

  //  {<ViewContact delete={deleteContact} />}
   const imageUrl = <div className='contact_image'></div>

  //change pageNo and then contacts  and then above three lines
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
  <div className='wrapper'>
    <div className='card'>
      <span className='contacts_heading'>Your Contacts</span>
      <div className="inputWithIcon inputIconBg">
         <input type='text' 
          placeholder='Search by name...' 
          className='search_input'
          onChange={handleSearchChange} />
        <i>
        <BiSearchAlt2 className='icon' />
        </i>
        
      </div>
      {/* <div className="sort-results">
            <span className="sort-criteria">Sort by name</span>
            <FcAlphabeticalSortingAz/>
            <FcAlphabeticalSortingZa/>
      </div>    */}
      <table id="contact-table">
        <thead>
            <tr>
                <th>#ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone No</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
      {
        currentContacts.map((contact)=>{
            return (   
          <tr key={contact.id}>
              <td>{contact.id}</td>              
              <td>{contact.image === "" || "null" ? imageUrl :''}</td>
              <td>{contact.name}</td>
              <td><Link to = {`/user/info/contact/${contact.id}`}>{contact.email}</Link></td>
              <td>{contact.phoneNo}</td>
              <td>
              <button type='submit' className='success' onClick={() =>editContact(contact)}>
                Edit
              </button>  
              <button type='submit' className='warning'onClick={() => deleteContact(contact)}>
                Delete
              </button>  
              </td> 
          </tr> 
              )
            })
         }
        </tbody>
     </table>  
     <Pagination 
     contactsPerPage ={contactsPerPage} 
     totalContacts={contactCount} 
     currentPageNo={currentPage}
     paginate={paginate} /> 
    </div>
  </div>
)
}

export default ShowContacts;

