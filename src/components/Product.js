import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


import "./Product.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function Products() {

  const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);

  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");




  useEffect(() => {
    async function getProducts() {
      const data = await fetch(API_URL + "/api/products", { method: "GET" });
      const products = await data.json();
      setCategories(Array.from(new Set(products.map(p => p.full_model.trim()))))
      setProducts(products);
    }
    getProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product => {
      return product.full_model === search;
    });
    setFiltered(filtered);
  }, [products, search]);


  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  setTimeout(() => {
    console.log(categories, products);
  }, 2000);

  // const filterProducts = async (event) => {
  //   const category = event.target.value;
  //   if (category === "all") {
  //     setProducts(allProducts);
  //   } else {
  //     const filteredProducts = products.filter(product => product.full_model.trim() === category);
  //     setProducts(filteredProducts);
  //   }
  // };

  return (
    <>
      <div className="container"
      >
        {
          products.map((product) => (
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
              <div className="navbar">
                <select onChange={handleSearch} className="filter">
                  <option value="all">Hamma shinalar</option>
                  {categories.map((category) => (
                    <option value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}

      </div >
    </>
  );
}
