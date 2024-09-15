import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ImageProvider from './context/imagecontext.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImageUpload from './components/ImageUpload.tsx';
import Filter from './components/Filter.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ImageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ImageUpload />}></Route>
          <Route path="/filter" element={<Filter />}></Route>
        </Routes>
      </Router>
    </ImageProvider>
  </StrictMode>
);
