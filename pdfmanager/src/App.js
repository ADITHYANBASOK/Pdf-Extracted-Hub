import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Loginpage from './Pages/Loginpage';
import SignUppage from './Pages/SignUppage';
import UploadandExtractpdf from './Pages/UploadandExtractpdf';
import Extractedpdfs from './Pages/Extractedpdfs';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<UploadandExtractpdf/>}/>
      <Route path='/extract' element={<Extractedpdfs/>}/>
      <Route path='/login' element={<Loginpage/>}/>
      <Route path='/signup' element={<SignUppage/>}/>


    </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
