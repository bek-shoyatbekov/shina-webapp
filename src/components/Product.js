import { useEffect, useState, useRef } from "react";
import handleViewport from 'react-in-viewport';

import "./Product.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function Products() {
  const [products, setProducts] = useState([]);
  const cardRef = useRef(null);
  const wheelRef = useRef(null);

  const [wheelPlaying, setWheelPlaying] = useState(true);


  useEffect(() => {
    async function getProducts() {
      const data = await fetch(API_URL + "/api/products", { method: "GET" });
      const products = await data.json();
      setProducts(products);
    }
    getProducts();
  }, []);

  useEffect(() => {
    if (wheelPlaying) {
      wheelRef.current.style.animationPlayState = "paused";
    }
  }, [wheelPlaying])


  const handleMouseOver = () => {
    setTimeout(() => {
      setWheelPlaying(false);
    }, 2000)
  };

  const handleMouseOut = () => {
    setWheelPlaying(true);
  };


  return (
    <>
      <div className="container"
      >
        {products.map((product) => (
          <div
            className="card"
            id="card"
            ref={cardRef}
            onMouseEnter={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <div className="imgBx" id="imbox">
              <img
                id="wheel"
                className="wheel"
                ref={wheelRef}
                src={
                  API_URL + "/" + product.image.split("/").slice(2).join("/")
                }
                alt={product.full_model}
              />
            </div>
            <div className="contentBx">
              <p className="color model">{product.full_name}</p>
              <div className="size">
                <span>3 oy</span>
                <span>6 oy</span>
                <span>9 oy</span>
              </div>
              <div className="color">
                <span>{product.percent_3m}%</span>
                <span>{product.percent_6m}%</span>
                <span>{product.percent_9m}%</span>
              </div>
              <p className="color price">{product.price_usd}$</p>
              <a href="#">Sotib olish</a>
            </div>
          </div>
        ))}
      </div >
    </>
  );
}
