import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Loginpage from './Pages/Loginpage';
import SignUppage from './Pages/SignUppage';
import UploadandExtractpdf from './Pages/UploadandExtractpdf';
import Extractedpdfs from './Pages/Extractedpdfs';
import Homepage from './Pages/Homepage';
import AllUploadedFiles from './Pages/AllUploadedFiles';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/extract' element={<UploadandExtractpdf/>}/>
      <Route path='/extractedfiles' element={<Extractedpdfs/>}/>
      <Route path='/login' element={<Loginpage/>}/>
      <Route path='/signup' element={<SignUppage/>}/>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/alluploadedfile' element={<AllUploadedFiles/>}/>

    </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
