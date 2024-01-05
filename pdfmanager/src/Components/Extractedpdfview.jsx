import { useEffect, useState } from "react";


import { Document, Page } from "react-pdf";
import downloadPdf from "../Pages/Downloadpdf";

function Extractedpdfview(props) {

    const [numPages, setNumPages] = useState(null);
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
      };

    const handleDownload = (pdf) => {
        const url = new URL(props.pdfFile);
        var filename = url.pathname.split('/').pop();
      downloadPdf(filename);
    };
  return (
    <>

    <div className="App">

    <div className="pdf-div">
    <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
    {Array.from({ length: numPages }, (_, index) => index + 1).map((page) => (
    <div key={page}>

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
   </div>
   <button onClick={()=>handleDownload(props.pdfFile)} >Download</button>
   </div>
   </div>
    </>
   )
 }

export default Extractedpdfview
