import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Extractedpdfview from './Extractedpdfview';
function Extractedfiles() {

    const [allImage, setAllImage] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);

    useEffect(() => {
        getPdf();
      }, [allImage]);
      const getPdf = async () => {
        const result = await axios.get(`http://localhost:4000/extract/getextracted-files`);
        console.log(result.data.data);
        setAllImage(result.data.data);
      };

      const showPdf = (pdf) => {
        // window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
        setPdfFile(`http://localhost:4000/files/${pdf}`)
        console.log("pdf",pdfFile)
      };
  return (
    <>
        <div className="uploaded">
        <h4>Extracted PDF:</h4>
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
                  <button className='dbutton' >Download PDF</button>
                 </div>
                  </div>
                );
              })}
              </div>

        </div>
        <Extractedpdfview pdfFile={pdfFile}/>

      </div>
    </>
  )
}

export default Extractedfiles
