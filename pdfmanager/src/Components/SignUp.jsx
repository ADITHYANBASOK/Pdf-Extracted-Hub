import React, { useState } from 'react'
import '../Login.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SignUp() {
    const [input,setInput] = useState({
        name:"",
        email:"",
        password:"",
    })

    const inputchange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setInput({...input,[name]:value})
      }

      const[formErrors,setFormErrors] = useState({});
     
      // Validation function
      const validate=(values)=>{
          var error={}
          const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!values.name) {
            error.name = "First name is required!";
          }
  
          if (!values.email) {
              error.email = "email is required!";
            }
             else if (!regex.test(values.email)) {
              error.email = "This is not a valid email format!";
            }
          if(!values.password){
            error.password="enter password"
          }
          return error
        }

      const Submit=(e)=>{
        e.preventDefault();
        setFormErrors(validate(input))
        if(Object.keys(formErrors).length === 0){

    axios.post('http://localhost:4000/SignUp/registration',input).then((response)=>{
      console.log("res===========>",response.data);
      if(response.data.success===true){
        // success toast message 
          toast.success('registered successfuliy', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
      }
  
    }).catch((err)=>{
      console.log(err);
    })
      }
    }
  return (
    <>
    <ToastContainer/>
    <div className='container'>

 <div className="wrapper">
  <form action="">
    <h2>Sign-Up</h2>
    <div className="input-box">

      <input type="text" placeholder="Name" required="" name='name' onChange={inputchange}/>
    <span> {formErrors?.name} </span>
    </div>
    <div className="input-box">

      <input type="email" placeholder="email" required="" name='email' onChange={inputchange}/>
     <span>{formErrors?.email} </span>
    </div>
    <div className="input-box">

      <input type="password" placeholder="password" required="" name='password' onChange={inputchange}/>
     <span>  {formErrors?.password}</span>
    </div>
  
    <button type="submit" onClick={Submit}>SiGN Up</button>
    <div className="register-link">
      <p>
        Already have an account<a href="/login"> login here</a>
      </p>
    </div>
  </form>
</div>
</div>
    </>
  )
}

export default SignUp
