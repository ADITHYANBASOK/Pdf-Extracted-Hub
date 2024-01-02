import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Extractuploadedfile from './Extractuploadedfile';
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();



function Uplodedfiles() {
    
    const [allImage, setAllImage] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    
    useEffect(() => {
        getPdf();
      }, []);
      const getPdf = async () => {
        const result = await axios.get('http://localhost:4000/upload/get-files');
        console.log(result.data.data);
        setAllImage(result.data.data);
      };

      const showPdf = (pdf) => {
        // window.open(`http://localhost:4000/files/${pdf}`, "_blank", "noreferrer");
        console.log('pdfff',pdf)
        setPdfFile(`http://localhost:4000/files/${pdf}`)
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
                      Show Pdf
                    </button>
                    <button
                      className="btn btn-primary"
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
