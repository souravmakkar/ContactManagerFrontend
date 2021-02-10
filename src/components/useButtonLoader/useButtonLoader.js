import  {useState,useEffect,useRef} from 'react';

const useButtonLoader = (defaultText = "Load", loadingText = "Loading...")=> {
const[isLoading,setIsLoading] = useState(false);
const elementOnApplied = useRef(null);

useEffect(
  ()=>{
    if(isLoading){
      elementOnApplied.current.disabled = true;
      elementOnApplied.current.innerHTML  = 
      '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> ' +loadingText;
    }
    else{
      elementOnApplied.current.disabled= false;
      elementOnApplied.current.innerHTML = defaultText;
    }
},[isLoading]);


  return [elementOnApplied,setIsLoading] //return array rather than object beacause we change the name
  //of array elements where we use it
}

export default useButtonLoader;
