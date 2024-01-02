import React, { useState } from 'react'
import axios from "axios";
import { pdfjs } from "react-pdf";
import Uplodedfiles from './Uplodedfiles';




pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();

function Pdfuploadform() {

    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");


    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);
        console.log(title, file);
    
        const result = await axios.post(
          'http://localhost:4000/upload/upload-files',
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(result);
        if (result.data.status == "ok") {
          alert("Uploaded Successfully!!!");
        }
     
      };
  return (
    <>
        <div className="App">

            <form className="formStyle" >
        <h4>Upload your Pdf for extracting</h4>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)} />
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
