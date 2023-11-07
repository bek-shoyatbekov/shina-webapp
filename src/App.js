import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Product from './components/Product';
import { useEffect } from 'react';


const tele = window.Telegram.WebApp;


function App() {

  useEffect(() => {
    tele.ready();
  })

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/wheel'} element={<Product />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
