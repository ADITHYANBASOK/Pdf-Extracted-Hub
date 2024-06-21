import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../Login.css'
function Login() {
    const [input,setInput] = useState({
        email:"",
        password:"",
    })
    const navigate=useNavigate()

    const[formErrors,setFormErrors] = useState({});

    const validate=(values)=>{
        var error={}
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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


    const inputchange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setInput({...input,[name]:value})
      }
      const Submit=(e)=>{
        console.log(input);
        e.preventDefault();
        setFormErrors(validate(input))
        console.log("errors",formErrors);
        if(Object.keys(formErrors).length === 0){

        
        axios.post('https://pdf-extracted-hub.vercel.app/login/login',input).then((response)=>{
          console.log("res===========>",response.data);
          if(response.data.success===true){

            //add data in localstorage

            localStorage.setItem('useremail',response.data.useremail)
            localStorage.setItem('u_login_id',response.data.loginId)
            localStorage.setItem('user_token',response.data.token)

              toast.success('login successfuliy', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                navigate('/')
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
            <h2>login</h2>
            <div className="input-box">
                <input type="email" name='email' placeholder="email" required onChange={inputchange}
                />
                  <span className='error-message' >{formErrors?.email} </span>
            </div>
            <div className="input-box">
                <input type="password" name='password' placeholder="password" required onChange={inputchange}/>
                <span className='error-message' >{formErrors?.password}  </span>
            </div>
            <div className="forgot-pass">
                <a href="#">forgot password? </a>
            </div>
            <button type="submit"  onClick={Submit}>Login</button>
            <div className="register-link">
                <p>Don't have an account?<a href="/signup">Register here</a></p>
            </div>
        </form>
    </div>
    </div>
    </>
  )
}

export default Login
