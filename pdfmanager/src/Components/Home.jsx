import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
    const loginid=localStorage.getItem('u_login_id')

    const navigate=useNavigate()
    const Extract = ()=>{
        navigate('/extract')
    }
    const SignIn = ()=>{
        navigate('/login')
    }


  return (
    <>
 <div className="banner"> 

<div className="content">
  <h1>Extract Your PDF</h1>
  <p>Welcome to PDF Extractor Hub, your go-to platform for seamless PDF management! Our user-friendly website empowers you to effortlessly upload PDF files and customize their contents based on your needs.</p>
  <div>
    <button type="button" onClick={Extract}>
      <span />
      Extract
    </button>
    {loginid==null?
    <button type="button" onClick={SignIn}>
      <span />
      Sign in
    </button>
    :null}
  </div>
</div>
</div>
    </>
  )
}

export default Home
