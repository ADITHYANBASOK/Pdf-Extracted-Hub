import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Extractedpdfview from './Extractedpdfview';
import downloadPdf from '../Pages/Downloadpdf';
function Extractedfiles() {

    const [allImage, setAllImage] = useState([]);
    const [pdfFile, setPdfFile] = useState(null);
    const [extractpdf, setExtractpdf] = useState([]);

    const token=localStorage.getItem('user_token')
    const loginid=localStorage.getItem('u_login_id')

    useEffect(() => {
        getPdf();
      }, [allImage,token,extractpdf]);
      const getPdf = async () => {
        if(token && loginid){
        const result = await axios.get(`https://pdf-extracted-hub.vercel.app/extract/Recentlygetextracted-files/${token}`);//get recently extracted pdf
        const result2 = await axios.get(`https://pdf-extracted-hub.vercel.app/extract/Allgetextracted-files/${loginid}`);// get All extracted pdf
        console.log(result.data.data);
        setAllImage(result.data.data);
        setExtractpdf(result2.data.data)

      }
      };

      const showPdf = (pdf) => {
        setPdfFile(`https://pdf-extracted-hub.vercel.app/files/${pdf}`)
        console.log("pdf",pdfFile)
      };
      const handleDownload = (pdf) => {
          downloadPdf(pdf);
        };

  return (
    <>
    <div className="App">

    <div className="uploaded">
    <div>
        {allImage.length?
        <h4>Recently Extracted PDF:</h4>
        :null}
        <div className="output-div">
            <div className='row'>
          {allImage == null
            ? ""
            : allImage.map((data,key) => {
                return (
                  <div className="inner-div col-md-3">
                    <h6>Title: extracted{key}</h6>
                    <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button>
                    <div>
                  <button className='dbutton' onClick={()=>handleDownload(data.pdf)} >Download PDF</button>
                 </div>
                  </div>
                );
              })}
              </div>

        </div>
        </div>

        
        {extractpdf.length?
        <div>
        <h4>All Extracted PDF:</h4>

        <div className="output-div">
            <div className='row'>
          {extractpdf == null
            ? ""
            : extractpdf.map((data,key) => {
                return (
                  <div className="inner-div col-md-3">
                    <h6>Title: extracted{key}</h6>
                    <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button>
                    <div>
                  <button className='dbutton' onClick={()=>handleDownload(data.pdf)} >Download PDF</button>
                 </div>
                  </div>
                );
              })}
              </div>

        </div>
        </div>
        :<h1>No extracted pdf</h1>}
        {pdfFile?
        <Extractedpdfview pdfFile={pdfFile}/>
        :null}

      </div>
      </div>
    </>
  )
}

export default Extractedfiles
