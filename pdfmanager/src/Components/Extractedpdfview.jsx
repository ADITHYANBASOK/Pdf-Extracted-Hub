import axios from "axios";
import { useEffect, useState } from "react";

import { Document, Page } from "react-pdf";

function Extractedpdfview(props) {
    const [numPages, setNumPages] = useState(null);
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
      };

    const handleDownload = (pdf) => {
        const url = new URL(props.pdfFile);
        var filename = url.pathname.split('/').pop();
    //   const pdfFileName = 'your-pdf-file.pdf'; // Replace with the actual file name
    //   downloadPdf(filename);
    };
  return (
    <>
       <div className="App">

<div className="pdf-div">
<Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
{Array.from({ length: numPages }, (_, index) => index + 1).map((page) => (
 <div key={page}>
   {/* <input
     type="checkbox"
     // checked={selectedPages.includes(page)}
     // onChange={() => handleCheckboxChange(page)}
   /> */}
   <span>{`Page ${page}`}</span>
   <Page
     key={`page_${page}`}
     pageNumber={page}
     renderTextLayer={false}
     renderAnnotationLayer={false}
   />
 </div>
 
))}
</Document>
<div>
{/* <p>Selected Pages: {selectedPages.join(', ')}</p> */}
</div>
<button onClick={()=>handleDownload(props.pdfFile)} >Download</button>
</div>
</div>
    </>
  )
}

export default Extractedpdfview
