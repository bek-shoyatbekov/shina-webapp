import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './components/Product';
import { useEffect } from 'react';
import Products from './components/Products';
import eruda from "eruda";


const tele = window.Telegram.WebApp;


function App() {

  useEffect(() => {
    tele.ready();
    eruda.init();
  })

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Products />} />
          <Route path={'/wheel'} element={<Product />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
