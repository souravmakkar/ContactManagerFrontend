import React,{useState,useEffect} from 'react';
import {IoMdContacts} from 'react-icons/io';
import { NavLink } from 'react-router-dom';

import './Navbar.style.css';
import AuthService from '../../services/auth.service';
import Dropdown from './DropDown/DropDown';

function Navbar() {

  const [click,setClick] = useState(false);
  const [dropdown,setDropown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () =>setClick(!click);
  const onMouseEnter = () =>{
    if(window.innerWidth< 960){
      setDropown(true)
    }
    else{
      setDropown(true);
    }
   };
 
   const onMouseLeave = () =>{
     if(window.innerWidth < 960){
       setDropown(false)
     }
     else{
       setDropown(false);
     }
    };

    
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(undefined);
  const[ShowAuthPage,setShowAuthPage] = useState(true);


  useEffect(() => {
   const user = AuthService.getCurrentUser();
    if(user){
      setShowAuthPage(!ShowAuthPage)
      setShowUserBoard(user.roles.includes("ROLE_USER"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  return (
    <div className='navbar'>
      <div className='menu-icon' onClick={handleClick}>
            <i className={ click ? 'fas fa-times':'fas fa-bars'}></i>
     </div>
        <NavLink to='/'className="navbar-logo">
          <IoMdContacts  className='navbar-icon'/>
          Contact Manager
        </NavLink>

      <ul className={ click ? 'nav-menu active':'nav-menu'}>
         {showUserBoard &&(
            <>
              <li className="nav-item">
                <NavLink activeClassName="selected" to='/user/contact' className='nav-links'>Add Contact</NavLink>
              </li>

              <li className="nav-item">
                <NavLink activeClassName="selected"  to='/user/show-contacts' className='nav-links'>View Contact</NavLink>
              </li>

              <li className='nav-item'
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                   >
                  <NavLink to='/user/profile' className='nav-links'
                  activeClassName="selected"
                   onClick={closeMobileMenu}>
                    Profile <i className='fas fa-caret-down'/>
                  </NavLink>
                {
                  dropdown && <Dropdown />
                }
              </li> 
              </>
         )}

         { 
         ShowAuthPage &&(
          <>    
            <li className="nav-item">
            <NavLink exact activeClassName="selected" to='/' className='nav-links'>Home</NavLink>
          </li>

            <li className="nav-item">
            <NavLink activeClassName="selected" to='/signin' className='nav-links' onClick={closeMobileMenu}>SignIn</NavLink>
          </li>

          <li className="nav-item">
            <NavLink activeClassName="selected" to='/signup' className='nav-links'>Signup</NavLink>
          </li>
         </>
         )}  

        { showAdminBoard &&(
          <>
            <li className="nav-item">
              <NavLink  to='/admin/home' className='nav-links'>Admin Board</NavLink>
            </li>
            <li className="nav-item">
              <NavLink  to='/admin/all-contacts' className='nav-links'>All Contacts</NavLink>
            </li>
            {/* <li className="nav-item">
                  <NavLink to="/logout" className="nav-links" onClick={logOut}>
                    LogOut
                  </NavLink>
                </li> */}
            </>
            )}
          
        </ul>      
    </div>
  )
}

export default Navbar
