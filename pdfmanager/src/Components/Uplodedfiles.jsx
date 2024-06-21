import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Extractuploadedfile from './Extractuploadedfile';




function Uplodedfiles() {
    
    const [allImage, setAllImage] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const token=localStorage.getItem('user_token')
    
    useEffect(() => {
        getPdf();
      }, []);
      const getPdf = async () => {
        const result = await axios.get(`https://pdf-extracted-hub.vercel.app/upload/get-files/${token}`);
        console.log(result.data.data);
        setAllImage(result.data.data);
      };
   
      // Function to set the selected PDF file for display and extraction
      const showPdf = (pdf) => {
        setPdfFile(`https://pdf-extracted-hub.vercel.app/files/${pdf}`)
        console.log("pdf",pdfFile)
      };
  return (
    <>
      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="output-div">
          <div className='row'>
            {allImage == null
              ? ""
              : allImage.map((data) => {
                return (
                  <div className="inner-div col-md-3">
                    <h6>Title: {data.title}</h6>
                    <button
                      className="btn btn-info"
                      onClick={() => showPdf(data.pdf)}
                    >
                      extract Pdf
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <Extractuploadedfile pdfFile={pdfFile}/>
    </>
  )
}

export default Uplodedfiles
