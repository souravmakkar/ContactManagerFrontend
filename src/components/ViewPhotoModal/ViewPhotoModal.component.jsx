import React from 'react'

import './ViewPhotoModal.css';

const ViewPhotoModal = ({closeModal,image,show,name}) => {
  // console.log(props);
return (
  <div className='modal-wrapper'>
    <div className="modal-content"
      style={{
      transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
      opacity:show ? '1' : '0'
      }} onClick={closeModal}>
           <div className='view-photo-header'>
             <h3>{name}</h3>
             <span onClick={closeModal}>x</span>
           </div>  
            <img className="view-image" src={image} 
             alt='Click Here'  />
      </div>
</div>
)
}

export default ViewPhotoModal
