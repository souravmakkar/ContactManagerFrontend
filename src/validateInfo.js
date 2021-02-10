export default function validateInfo(values) {
  
let errors= {};
  //name
if(values.hasOwnProperty('name')){
    if(!values.name.trim()){ // remove whitespaces and check it is not null
      errors.name="Username is required";
    }
    else if(!(values.name.length>=3 && values.name.length<15)){
      errors.name="Uername must contains 3 alphabets an maximum up to 15";
    }
}
if(values.hasOwnProperty('secondName')){
  if(!values.secondName.trim()){ // remove whitespaces and check it is not null
    errors.secondName="Secondname is required";
  }
  else if(!(values.secondName.length>=3 && values.secondName.length<15)){
    errors.secondName="Secondname must contains 3 alphabets an maximum up to 15";
  }
}

   //Email
 if(values.hasOwnProperty('email')){
    if(values.email!= null)
    {
      if(!values.email){
        errors.email='Email is required';
      }
      else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
      }
    }
   }

//phone No
if(values.hasOwnProperty('phoneNo')){
  let input =values.phoneNo;
  let phoneno = /^\d{10}$/;
 if(!input){
   errors.phoneNo="Phone no is required";
 }
 else if(!input.match(phoneno)){
  errors.phoneNo="Phone number must be valid";
 }
}

  //Password
  if(values.hasOwnProperty('password')){
    if(!values.password){
      errors.password='Password is required'
    }
    else if(values.password.length< 6){
      errors.password = 'Password needs to be 6 characters or more';
    }
}
  //confirm Password
  if(values.confirmPassword!=null){
    if(!values.confirmPassword){
      errors.confirmPassword='Password is required'
    }
    else if(values.password !==values.confirmPassword){
      errors.confirmPassword = 'Passwords do not match';
    }
}
if(values.hasOwnProperty('work')){
  if(!values.work){
    errors.work='Work is required'
  }
}

if(values.about!=null){
    if(!values.about){
      errors.about='About is required'
    }
}
  return errors;
}

export const imageValidate=(image)=>{
  const allowedTypes=['png', 'jpg', 'jpeg'], maxFileSize= 1024;
  let errors ={}
  if(!image){
    errors.image='Image is required'
    }
   else if(image && !allowedTypes.includes(image.type.split('/')[1])) {
    errors['image'] = 'Invalid file type!';
  }
 else if(image &&  maxFileSize * 1024 < Math.round(image.size)) {
    errors['image'] = `File is too large(${Math.round(image.value.size / 1024)}KB), it cannot be larger than ${maxFileSize}KB`;
  }
  return errors;
}

