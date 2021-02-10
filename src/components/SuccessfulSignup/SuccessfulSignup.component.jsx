import React from 'react';
import {Link} from 'react-router-dom'
import './SuccessfulSignup.style.css';

function SuccessfulSignup(props) {
  console.log(props);
  return (
    <div className='success-signup'>
      <div className="image">
      </div>
      <div className='content'>
        <p>{props.user}</p>
       <Link to='/signin'>Sign In</Link>
      </div>
    </div>
  )
}

export default SuccessfulSignup
