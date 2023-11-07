import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import Product from './components/Product';


function App() {
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
