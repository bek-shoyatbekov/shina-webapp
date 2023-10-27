import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


import "./Product.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function Products() {

  const [categories, setCategories] = useState([]);

  const [sizes, setSizes] = useState([]);


  const [category, setCategory] = useState('all');

  const [selectedSize, setSelectedSize] = useState('all');

  const [products, setProducts] = useState([]);

  console.log(products)


  useEffect(() => {
    async function getProducts() {
      const data = await fetch(API_URL + "/api/products", { method: "GET" });
      const jsonData = await data.json();
      setCategories(Array.from(new Set(jsonData.map(product => product.full_model.trim()))));
      setSizes(Array.from(new Set(jsonData.map(product => product.full_name.split(" ")[product.full_name.split(" ").length - 1]))));
      setProducts(jsonData);
    }
    getProducts();
  }, []);



  const filteredProducts = category !== 'all' ? products.filter(product => product.full_model.trim() === category) : products;

  return (
    <>
      <div className="container"
      >
        {
          filteredProducts.map((product) => (
            <div
              className="card"
              id="card"
            >
              <div className="imgBx" id="imbox">
                <img
                  id="wheel"
                  className="wheel"
                  src={
                    API_URL + "/" + product.image.split("/").slice(2).join("/")
                  }
                  alt={product.full_model}
                />
              </div>
              <div className="contentBx" id="contentBx">
                <p className="color model">{product.full_name}</p>
                <div className="size" style={{ marginTop: '20px' }}>
                  <span>3 oy</span>
                  <span>6 oy</span>
                  <span>9 oy</span>
                </div>
                <div className="color">
                </div>
                <p className="color price" style={{ marginTop: '30px' }}>         </p>
                <Link to={`/wheel/${product._id}`}> Sotib olish </Link>
              </div>
            </div>
          ))}
        <div className="navbar">
          <select className="filter  category-filter" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="all">Shina turlari</option>
            {categories.map((category) => (
              <option key={category} value={category.trim()}>{category}</option>
            ))}
          </select>
          <select
            className="filter  size-filter"
            value={selectedSize}
            onChange={e => setSelectedSize(e.target.value)}
          >
            <option value="all">O'lcham tanlash</option>
            {sizes.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div >
    </>
  );
}
