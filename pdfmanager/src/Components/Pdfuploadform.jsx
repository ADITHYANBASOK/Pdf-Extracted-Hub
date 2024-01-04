import React, { useEffect, useState } from 'react'
import axios from "axios";
import { pdfjs } from "react-pdf";
import Uplodedfiles from './Uplodedfiles';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();

function Pdfuploadform() {

    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");
    const token=localStorage.getItem('user_token')
    const loginid=localStorage.getItem('u_login_id')
    console.log("hai",loginid);
    const navigate= useNavigate()

    const[formErrors,setFormErrors] = useState({});

    const validate=(values)=>{
        var error={}

        if (!values) {
          error.title = "Title name is required!";
        }
        return error
      }

    //   useEffect(() => {
    // }, [title]);

    const submit = async (e) => {
        e.preventDefault();
       setFormErrors(validate(title));

        console.log('errprs',formErrors);

        if(Object.keys(formErrors).length === 0 ){

            console.log('errprs',formErrors);
        if(token){
            if(file && title){
        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);
        console.log(title, file);
    
        const result = await axios.post(
          `http://localhost:4000/upload/upload-files/${token}/${loginid}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
 
        console.log(result);
        if (result.data.status == "ok") {
            toast.success('pdf uploaded successfuliy', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });     
                window.location.reload();
            }
    }
    }else{
        navigate('/login')
    }
}
     
      };
  return (
    <>
    <ToastContainer/>
        <div className="App">

            <form className="formStyle" >
        <h4>Upload your Pdf for extracting</h4>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          name='title'
          required
          onChange={(e) => setTitle(e.target.value)} />
              <span style={{color:'red'}}>
                    {formErrors?.title}
                  </span>
        <br />
        <input
          type="file"
          class="form-control"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])} />
        <br />
        <button class="btn btn-primary" type="submit" className='Ubutton' onClick={submit}>
          Upload
        </button>
      </form>
      <Uplodedfiles/>
      </div>
    </>
  )
}

export default Pdfuploadform
