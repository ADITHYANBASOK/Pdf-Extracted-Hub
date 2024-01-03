import React, { useState } from 'react'
import '../Login.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SignUp() {
    const [input,setInput] = useState({})

    const inputchange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setInput({...input,[name]:value})
      }
      const Submit=(e)=>{
        console.log(input);
        e.preventDefault();
        
    axios.post('http://localhost:4000/SignUp/registration',input).then((response)=>{ //register api
      console.log("res===========>",response.data);
      if(response.data.success===true){
        
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
  return (
    <>
    <ToastContainer/>
    <div className='container'>

 <div className="wrapper">
  <form action="">
    <h2>Sign-Up</h2>
    <div className="input-box">
      <span className="icon">
        <ion-icon name="person" />
      </span>
      <input type="text" placeholder="Name" required="" name='name' onChange={inputchange}
/>
    </div>
    <div className="input-box">
      <span className="icon">
        <ion-icon name="person" />
      </span>
      <input type="email" placeholder="email" required="" name='email' onChange={inputchange}
/>
    </div>
    <div className="input-box">
      <span className="icon">
        <ion-icon name="lock-closed" />
      </span>
      <input type="password" placeholder="password" required="" name='password' onChange={inputchange}
 />
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
