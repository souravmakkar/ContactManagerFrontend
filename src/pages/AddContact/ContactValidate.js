export default function ContactValidate(values) {
  let errors= {};

  //name
if(values.hasOwnProperty('name')){
    if(!values.name.trim()){ // remove whitespaces and check it is not null
      errors.name="Username is required";
    }
    else if(!(values.name.length>=3 && values.name.length<15)){
      errors.name="Username must contains 3 alphabets an maximum up to 15";
    }
}
// else{
//   values.name = '';
// }

if(values.hasOwnProperty('secondName')){
  if(!values.secondName.trim()){ // remove whitespaces and check it is not null
    errors.secondName="Secondname is required";
  }
  else if(!(values.secondName.length>=3 && values.secondName.length<15)){
    errors.secondName="Secondname must contains 3 alphabets an maximum up to 15";
  }
}
// else{
// values.name = '';
// }

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

if(values.hasOwnProperty('work')){
  if(!values.work){
    errors.work='Work is required'
  }
}

if(values.hasOwnProperty('description')){
  if(!values.description){
    errors.description='Description is required'
  }
}
else{
  values.description=''
}

  return errors;
}