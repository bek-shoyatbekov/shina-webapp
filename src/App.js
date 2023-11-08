import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './components/Product';
import { useEffect } from 'react';
import Products from './components/Products';
import eruda from "eruda";
import { TelegramWebApp } from 'react-telegram-webapp';


const tele = window.Telegram.WebApp;


function App() {

  useEffect(() => {
    tele.ready();
    eruda.init();
  })

  return (
    <>
      <TelegramWebApp>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Products />} />
            <Route path={'/wheel'} element={<Product />} />
          </Routes>
        </BrowserRouter>
      </TelegramWebApp>
    </>
  );
}

export default App;
