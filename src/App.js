import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import Product from './components/Product';
import { AdminHome } from './pages/Admin';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Login from './pages/AdminLogin';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/wheel'} element={<Product />} />
          <Route path={'/admin'} element={<Login />} />
          <Route path={'/admin/home'} element={< AdminHome />} />
          <Route path={'/admin/add'} element={< AddProduct />} />
          <Route path={'/admin/edit'} element={< EditProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
