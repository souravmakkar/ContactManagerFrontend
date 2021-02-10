import React from 'react';
import authAxios from '../../services/Interceptors';
import swal from 'sweetalert';

import './UploadPhoto.style.css';

function UploadPhoto({image,closeModal}) {
  console.log(image);
  let srcImage = URL.createObjectURL(image);
  console.log(srcImage);

  const uploadImageHandler =()=>{
      let formdata = new FormData();
      formdata.append("image",image)
      const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
      authAxios.post(`/user/profile/image`,formdata,config)
      .then(response => {
        console.log(response);
        swal({
          title: `${response.data}`,
          icon: "success",
          button: "okh",
        });
        closeModal();
        // window.location.reload();
    })
    .catch(error => {
        console.log(error);
    });    
  }

  return (
   <div className='camera-modal upload_photo'>
     <div className='header'>
        <span className='close-modal' onClick={closeModal}>X</span>
        <p>Upload a photo</p>
     </div>
     <div className="preview upload_photo_preview ">
             <img className="preview-img upload-img" src={srcImage}
              alt='Click Here'  />
              <div className="btn-container">
                  <button className="btn save-btn" onClick={uploadImageHandler}>
                  <i className="fa fa-check" aria-hidden="true"></i>
                  </button>
              </div>
        </div> 
    </div>
  )
}

export default UploadPhoto
