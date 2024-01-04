import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Extractuploadedfile(props) {

    const [numPages, setNumPages] = useState(null);
    const [selectedPages, setSelectedPages] = useState([]);

    const token=localStorage.getItem('user_token')
    const loginid=localStorage.getItem('u_login_id')
  
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    };
    console.log("ardra",props.pdfFile);
    if(props.pdfFile){
    const url = new URL(props.pdfFile);
    var filename = url.pathname.split('/').pop();
    console.log('Filename:', filename);
    }else{
         filename=''
    }

    const generateNewPdf = async () => {
        try {
            console.log('adi',filename);
          const response = await fetch(`http://localhost:4000/extract/generate-pdf/${filename}/${token}/${loginid}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
    
            body: JSON.stringify({ selectedPages }),
          });
      
          const data = await response.json();
      
          if (data.status === 'ok') {
            toast.success('pdf Extracted successfuliy', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              });                 // You can save or download the new PDF as needed
          } else {
            console.error('Error:', data.message);
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
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
    <button onClick={generateNewPdf}>create new pdf</button>
  </div>
    </>
  )
}

export default Extractuploadedfile
