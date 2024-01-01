import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Pdfuploadform from './Components/Pdfuploadform';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Pdfuploadform/>}/>
    </Routes>
    </BrowserRouter>

    </>
  );
}

export default App;
