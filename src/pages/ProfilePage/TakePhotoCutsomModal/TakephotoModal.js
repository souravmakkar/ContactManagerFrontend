import React,{useState,useRef,useEffect} from 'react';
import './TakephotoModal.css';
import authAxios from '../../../services/Interceptors';


function TakephotoModal({closeModal}) {
  const canvasWidth = 380;
  const canvasHeight = 380;
  const [imageURL,setImageURL] = useState('');
  const videoEle = useRef(null);
  const canvasEle = useRef(null);
  const imageEle = useRef(null);


  const dataURItoBlob=(dataURI) =>{
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

  useEffect(() => {
    startCamera();
  }, [])

const startCamera = async () => {
  try {
    navigator.mediaDevices.getUserMedia({
          video: true ,
        }).then((stream)=>{
      videoEle.current.srcObject = stream;   
      })
  }
   catch(err) {
      console.log(err);
  }
}

  const stopCam = () => {
    const stream = videoEle.current.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => {
      track.stop();
    });
}

const backToCam = () => {
  setImageURL('');
  startCamera();
}

  const takeSelfie = async () => {
    const ctx = canvasEle.current.getContext('2d');
    canvasEle.current.width = canvasWidth;
    canvasEle.current.height = canvasHeight;
     ctx.drawImage(videoEle.current, 0, 0, canvasWidth, canvasHeight);
    const imageDataURL = canvasEle.current.toDataURL('image/jpeg', 0.5);
    console.log(imageDataURL);
    stopCam();
    setImageURL(imageDataURL);
  }

  const modalAndCameraClose =() =>{
    closeModal();
  }

  const saveToDatabase = () =>{
    const image = document.createElement('img');
    image.src = imageURL;  
    document.body.appendChild(image);
    let formData = new FormData(document.forms[0]); 
    var blob = dataURItoBlob(imageURL);
    console.log(blob);
    formData.append('image',blob);

    for(var pair of formData.entries()) {
      console.log(pair[0]+ ', '+ pair[1]);
   }

   const config = {     
      headers: { 'content-type': 'multipart/form-data' }
  }
    authAxios.post(`/user/profile/image`,formData,config)
    .then(response => {
      console.log(response);
      // imagePreview(blob);
  })
  .catch(error => {
      console.log(error);
  });
  }

  return (
    <div className='camera-modal'>
      <div className='header'>
        <span className='close-modal' onClick={modalAndCameraClose}>X</span>
        <p>Take a photo</p>
      </div>
         {
              imageURL === '' && 
            (
              <div className="show-camera">
                        <video 
                          className="video-player" autoPlay={true}
                          ref={videoEle} />
                        <button className="btn capture-btn" onClick={takeSelfie}>
                            <i className="fa fa-camera" aria-hidden="true"></i>
                        </button>
              </div>)
         }
     <canvas ref={canvasEle} style={{display: 'none'}}/>
      {
         imageURL !== '' 
        && (
          <div className="preview">
             <img className="preview-img" src={imageURL} 
              alt='Click Here' ref={imageEle} />
              <div className="btn-container">
                  <button className="btn back-btn" onClick={backToCam}>
                    <i className="fa fa-chevron-left" aria-hidden="true"/>
                  </button>
                  <a href={imageURL} download="selfie.png"
                    className="btn download-btn">
                    <i className="fa fa-download" aria-hidden="true"/>
                  </a>
                  <button className="btn save-btn" onClick={saveToDatabase}>
                  <i className="fa fa-check" aria-hidden="true"></i>
                  </button>
              </div>
        </div> 
             )
       }
   </div>
  ) 
}

export default TakephotoModal;
