import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
function Extractuploadedfile(props) {

    const [numPages, setNumPages] = useState(null);
    const [selectedPages, setSelectedPages] = useState([]);
  
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    };
  
  
    useEffect(() => {
      setSelectedPages([])
    }, [props]);
  
    const handleCheckboxChange = (page) => {
      setSelectedPages((prevSelectedPages) => {
        if (prevSelectedPages.includes(page)) {
          // Deselect page if already selected
          return prevSelectedPages.filter((selectedPage) => selectedPage !== page);
        } else {
          // Select page if not selected
          return [...prevSelectedPages, page];
        }
      });
    };
  
  return (
    <>
        <div className="pdf-div">
    <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from({ length: numPages }, (_, index) => index + 1).map((page) => (
        <div key={page}>
          <input
            type="checkbox"
            checked={selectedPages.includes(page)}
            onChange={() => handleCheckboxChange(page)}
          />
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
      <p>Selected Pages: {selectedPages.join(', ')}</p>
    </div>
    <button >create new pdf</button>
  </div>
    </>
  )
}

export default Extractuploadedfile
