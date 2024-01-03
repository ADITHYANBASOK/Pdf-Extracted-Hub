import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../Login.css'
function Login() {
    const [input,setInput] = useState({})
    const navigate=useNavigate()

    const inputchange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setInput({...input,[name]:value})
      }
      const Submit=(e)=>{
        console.log(input);
        e.preventDefault();
        
        axios.post('http://localhost:5000/login/login',input).then((response)=>{
          console.log("res===========>",response.data);
          if(response.data.success===true){

            //add data in localstorage

            localStorage.setItem('useremail',response.data.useremail)
            localStorage.setItem('u_login_id',response.data.loginId)
            localStorage.setItem('user_token',response.data.token)
            //toast
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
  return (
    <>
    <ToastContainer/>
      <div className='container'>
        <div class="wrapper">
        <form action="">
            <h2>login</h2>
            <div class="input-box">
                <span class="icon"><ion-icon name="person"></ion-icon></span>
                <input type="email" name='email' placeholder="email" required onChange={inputchange}/>
            </div>
            <div class="input-box">
                <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
                <input type="password" name='password' placeholder="password" required onChange={inputchange}/>
            </div>
            <div class="forgot-pass">
                <a href="#">forgot password? </a>
            </div>
            <button type="submit"  onClick={Submit}>Login</button>
            <div class="register-link">
                <p>Don't have an account?<a href="/signup">Register here</a></p>
            </div>
        </form>
    </div>
    </div>
    </>
  )
}

export default Login
