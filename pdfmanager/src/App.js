import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Pdfuploadform from './Components/Pdfuploadform';
import Extractedfiles from './Components/Extractedfiles';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Pdfuploadform/>}/>
      <Route path='/extract' element={<Extractedfiles/>}/>
    </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
