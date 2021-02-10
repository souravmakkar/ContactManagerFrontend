import React  from 'react';
import './NoMatchPage.style.css';

function NoMatchPage(props) {
 
  return (
    <div className='no-match'>
      <h3>Looking for something?</h3>
      <p>We're sorry. The Web address you entered is not a functioning page on our site.</p>
    </div>
  )
}

export default NoMatchPage
