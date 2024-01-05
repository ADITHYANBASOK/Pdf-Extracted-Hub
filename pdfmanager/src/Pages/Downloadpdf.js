import axios from "axios";

//downloading pdf function
const downloadPdf = async (pdfFileName) => {
    try {
      const response = await axios.get(`http://localhost:4000/files/${pdfFileName}`, {
        responseType: 'blob', // This ensures that the response is treated as a binary blob
      });
  
      // Create a Blob from the PDF data
      const blob = new Blob([response.data], { type: 'application/pdf' });
  
      // Create a link element
      const link = document.createElement('a');
  
      // Set the href attribute with a Blob URL
      link.href = window.URL.createObjectURL(blob);
  
      // Specify the download attribute with the desired file name
      link.download = pdfFileName;
  
      // Append the link to the document body
      document.body.appendChild(link);
  
      // Trigger a click on the link to start the download
      link.click();
  
      // Remove the link from the document body
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  export default downloadPdf