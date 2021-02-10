import React,{useState} from 'react';
import {MenuItems} from '../MenuItem';
import {NavLink} from 'react-router-dom';

import './Dropdown.css';
function Dropdown() {
  const [click,setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <>
    <ul onClick={handleClick}
      className={click ? 'dropdown-menu clicked':'dropdown-menu'}>
        <i className="fa fa-caret-up"/>
        {
          MenuItems.map((menuItem)=>{
            return <li key={menuItem.title}>
                      <NavLink activeClassName="selected" className={menuItem.cName}  //dropdown-link
                      to={menuItem.path}
                      onClick={()=>setClick(!click)}>
                      <div className='dropdown-data'>
                        <i className={'dropdown_icon '+ menuItem.iconClass} />
                        {menuItem.title}
                      </div>
                      </NavLink>
                    </li>
          })
        }
      </ul>
      
    </>
  )
}

export default Dropdown
