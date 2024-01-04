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
        const result = await axios.get(`http://localhost:4000/extract/Recentlygetextracted-files/${token}`);
        const result2 = await axios.get(`http://localhost:4000/extract/Allgetextracted-files/${loginid}`);

        console.log(result.data.data);
        setAllImage(result.data.data);
        setExtractpdf(result2.data.data)
        console.log('tokem',allImage);
        console.log('tokemIf',extractpdf);

      }
      };

      const showPdf = (pdf) => {
        // window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
        setPdfFile(`http://localhost:4000/files/${pdf}`)
        console.log("pdf",pdfFile)
      };
      const handleDownload = (pdf) => {
        //   const pdfFileName = 'your-pdf-file.pdf'; // Replace with the actual file name
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
