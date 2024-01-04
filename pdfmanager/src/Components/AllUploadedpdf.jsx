import axios from 'axios';
import React, { useEffect, useState } from 'react'
import downloadPdf from '../Pages/Downloadpdf';



function AllUploadedpdf() {
    const [allImage, setAllImage] = useState([]);
    const loginid=localStorage.getItem('u_login_id')

    useEffect(() => {
        getPdf();
      }, [allImage,loginid]);
      const getPdf = async () => {
        if(loginid){
        const result = await axios.get(`http://localhost:4000/upload/get-Allfiles/${loginid}`);
        console.log(result.data.data);
        setAllImage(result.data.data);
    }
      };
      const handleDownload = (pdf) => {
        //   const pdfFileName = 'your-pdf-file.pdf'; // Replace with the actual file name
          downloadPdf(pdf);
        };

  return (
    <>
<div className="App">
{allImage.length?
<div className="uploaded">
<h4>All Uploaded PDF's:</h4>
<div className="output-div">
    <div className='row'>
  {allImage == null
    ? ""
    : allImage.map((data,key) => {
        return (
          <div className="inner-div col-md-3">
            <h6>Title: {data.title}</h6>
            <div>
          <button className='dbutton' onClick={()=>handleDownload(data.pdf)} >Download PDF</button>
         </div>
          </div>
        );
      })}
      </div>

</div>
</div>
:<h2>No uploaded files</h2>}
</div>
    </>
  )
}

export default AllUploadedpdf
