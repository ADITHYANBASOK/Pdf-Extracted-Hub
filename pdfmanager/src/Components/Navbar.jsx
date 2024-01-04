import React from 'react'
import '../Navbar.css'
import { useNavigate } from 'react-router-dom'
function Navbar() {
    const navigate=useNavigate()
    const token=localStorage.getItem('user_token')
    const Logout = ()=>{
        localStorage.removeItem('useremail')
        localStorage.removeItem('u_login_id')
        localStorage.removeItem('user_token')
        navigate('/')
      }
      const Login=()=>{
        navigate('/login')

      }
  return (
    <>
 <div class="banner1">

<div className="navbar">
{/* <img src="#" className="logo" /> */}
<h3 className='header'>PDF Extractor Hub</h3>
<ul>
<li>
<a href="/">Home</a>
</li>
<li>
<a href="/extract">Extract</a>
</li>
<li>
<a href="/extractedfiles">Extracted file</a>
</li>
<li>
<a href="/alluploadedfile">Uploaded files</a>
</li>
{token?
<li>
<a href="#" onClick={Logout}>Logout</a>
</li>
:
<li>
<a href="#" onClick={Login}>Login</a>
</li>
}
</ul>
</div>
</div>
    </>
  )
}

export default Navbar
