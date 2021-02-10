import React,{useState,useEffect,useRef} from 'react';
import Modal from 'react-modal';
import swal from 'sweetalert';

import './ProfilePage.style.css';
import UserService from '../../services/userService';
import TakephotoModal from './TakePhotoCutsomModal/TakephotoModal';
import ViewPhotoModal from '../../components/ViewPhotoModal/ViewPhotoModal.component';
import UploadPhoto from '../../components/UploadPhoto/UploadPhoto.component';


function ProfilePage({history}) {
  const proFileContainer = useRef(null);
  const [profileImg] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
  const [imageUrl,setImageUrl ] = useState(null);
  const[loggedUser,setLoggedUser] = useState({});

  const[menuModel,setMenuModel] = useState(false);
  const[takePhotoModel,setTakePhotoModel] = useState(false); //want to open the modal
  const[showViewPhotoModal,setViewPhotoModal] = useState(false);
  const[uploadPhotoModel,setUploadPhotoModel] = useState(false);
  const[uploadImage,setUploadImage] = useState(); //image upload

  const [showInputName,setShowInputName] = useState(false);
  const[showInputEmail,setShowInputEmail] = useState(false);
  const[showErrorMessageName,setShowErrorMessageName] = useState(false);
  const[showErrorMessageEmail,setShowErrorMessageEmail] = useState(false);
  
  useEffect(() => {
    window.addEventListener("mousedown",handleClickOutside );
    return () => {
      window.removeEventListener("mousedown",handleClickOutside );
    };
  },[menuModel]);

  const handleClickOutside = (event)=>{
    if( proFileContainer.current && 
      !proFileContainer.current.contains(event.target))
      {
        setMenuModel(false);
    };
  };


  const toogleTakePhotoModal =()=>{
    setTakePhotoModel(!takePhotoModel)
  }

  const toogleUploadPhotoModal = () =>{
    setUploadPhotoModel(!uploadPhotoModel);
  }

  const toogleMenuModal = () =>{
    setMenuModel(!menuModel);
  }

  const toogleViewPhotoModal = () =>{
    setViewPhotoModal(!showViewPhotoModal);
  }

  const removePhoto = ()=>{
    setImageUrl(null);
    setMenuModel(false);
  }

  const getCurrentUserDetails =()=>{
    UserService.getUserDashBoard()
    .then((response)=>{
      console.log(response.data);
      setLoggedUser(response.data);
    })
    .catch((error)=>{
      console.log(error);
      console.log(error.message);
    });
  }

    useEffect(() => {
      getCurrentUserDetails()
    }, [])


  const uploadImageHandler = (e)=>{
    setUploadImage(e.target.files[0]);
    toogleUploadPhotoModal();
  }

  const changeProfileName = (name)=>{
    UserService.updateProfileName(name)
    .then((response)=>{
      setShowInputName(false);
      swal({
        title: `${response.data}`,
        icon: "success",
        button: "okh",
      });
      window.setTimeout(() => {
        history.push('/user/signout')
      }, 2000)
    })
    .catch((error)=>{
      setShowInputName(false);
      setShowErrorMessageName(true);
      console.log(error);
    });
  }

  const changeProfileEmail = (email) =>{
    UserService.updateProfileEmail(email)
    .then((response)=>{
      setShowInputEmail(false);
      setShowInputName(false);
      swal({
        title: `${response.data}`,
        icon: "success",
        button: "okh",
      });
      console.log(response.data);
    })
    .catch((error)=>{
      setShowInputEmail(false);
      setShowErrorMessageEmail(true);
      console.log(error);
    });
  }


  const handleChange=(e) =>{
    const {name,value} = e.target;
    setLoggedUser({
      ...loggedUser,
      [name]:value
    });
  };


  return (
  <div className='profile_page'>
      <div className = "profile-container" ref={proFileContainer}>
        {
          !loggedUser.imageUrl ?
           <img src={profileImg} 
            alt='defaul_picture' className='image'/> 
            :
          <img src={`/images/${loggedUser.name}/${loggedUser.imageUrl}`}
            alt='profile_image' className='image'/> 
        }
         {/* <img src={!imageUrl ? profileImg  : imageUrl} 
            alt='defaul_picture' className='image'/>  */}
          <input type='file' name='image-upload' id='input' 
              onChange={(e)=> uploadImageHandler(e)}/>
           <div className='label' onClick={toogleMenuModal}>
              <i className="fa fa-picture-o" aria-hidden="true"/>
               { !imageUrl ? 'Upload ':'Change '}your photo
           </div>  

           {
            menuModel && (
              <div className='image-options'>
                <ul>
                <li onClick={toogleViewPhotoModal}>
                  View photo
                </li>
                  <li onClick={toogleTakePhotoModal}>
                    <div>Take photo</div>
                    </li>
                  <li>
                    <label htmlFor='input'>
                      Upload photo
                      </label>
                  </li>                 
                  <li onClick={removePhoto}>Remove photo </li>
                </ul>
              </div>
            )
          }
      </div>
       <Modal isOpen={takePhotoModel} 
          className="mymodal"
          overlayClassName="modal_overlay">
            <TakephotoModal closeModal={toogleTakePhotoModal}/>
       </Modal>

          {
            showViewPhotoModal &&
              <ViewPhotoModal 
               name={loggedUser.name}
                closeModal={toogleViewPhotoModal} 
                image={imageUrl} show={showViewPhotoModal}/>
           }

          {
           uploadPhotoModel &&
            <Modal isOpen={uploadPhotoModel} 
                className="mymodal"
                overlayClassName="modal_overlay">
              <UploadPhoto  image ={uploadImage} closeModal={toogleUploadPhotoModal}/>
           </Modal>
           }

   <div className='profile-info'>       
     <div className='edit-block-1'>
         <h3>Your Name</h3>
       {showErrorMessageName &&  <span className='alert'>Username already exists</span> }
          {
             showInputName &&
             <>  
             <input type="text" autoFocus className='profile-input'
              name="name" value={loggedUser.name} 
              onChange={handleChange}
             />
             <i className="fa fa-check" aria-hidden="true" onClick={()=>changeProfileName(loggedUser.name)}></i>
           </>  
          }
          {
          !showInputName &&<p>{loggedUser.name} <i className="fa fa-pencil" aria-hidden="true" onClick={() => {
            setShowErrorMessageName(false)
            setShowInputName(true)}}></i></p>
           }
      </div>
      <div className='edit-block-2'>
         <h3>Your Email</h3>
          {showErrorMessageEmail &&  
          <span className='alert'>Email already exists</span> }
         {
             showInputEmail &&
             <>  
             <input type="text" autoFocus className='profile-input' 
             name="email" value={loggedUser.email}
             onChange={handleChange}/>
             <i className="fa fa-check" aria-hidden="true" onClick={() => changeProfileEmail(loggedUser.email)}></i>
           </>       
         }
         {
          !showInputEmail &&<p>{loggedUser.email} <i className="fa fa-pencil" aria-hidden="true" onClick={() => {
            setShowErrorMessageEmail(false);
            setShowInputEmail(true)}
          }></i></p>
         }
       </div>
  </div>    
 </div>
  )
}

Modal.setAppElement("#root");


export default ProfilePage
