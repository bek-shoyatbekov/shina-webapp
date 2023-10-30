import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

import "./Product.css";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export default function Product() {
  const location = useLocation();
  const { productId } = queryString.parse(location.search);

  const username = localStorage.getItem("username");
  const userContact = localStorage.getItem("userContact");

  const [product, setProduct] = useState();
  const [creditType, setCreditType] = useState("no");

  async function orderProduct(productId) {
    try {
      // const response = await fetch(
      //   `${API_URL}/api/order/${productId}?userContact=${userContact}&username=${username}&creditType=${creditType}`,
      //   {
      //     method: "GET",
      //   }
      // );

      const response = await axios.get(
        `${API_URL}/api/order/${productId}?userContact=${userContact}&username=${username}&creditType=${creditType}`
      );

      if (response.ok) {
        alert(`Buyutmangiz qabul qilindi!`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function getProduct() {
      // const data = await fetch(API_URL + "/api/product/" + productId, {
      //   method: "GET",
      // });
      const jsonData = (await axios.get(`${API_URL}/api/product/${productId}`))
        .data;
      setProduct(jsonData);
    }
    getProduct();
  }, [productId]);

  function RenderProduct({ product }) {
    if (product) {
      return (
        <div className="card" id="card">
          <div className="imgBx" id="imbox">
            <img
              id="wheel"
              className="wheel"
              src={API_URL + "/" + product.image.split("/").slice(2).join("/")}
              alt={product.full_model}
            />
          </div>
          <div className="contentBx" id="contentBx">
            <p className="color model">{product.full_name}</p>
            <ul className="details">
              <li className="detail_item">
                Narxi :{product.price_usd.trim()} $
              </li>
              <li className="detail_item">Naqtga :{product.percent_cash} %</li>
              <li className="detail_item">O'lchami :{product.size}</li>
              <li className="detail_item">Uzunligi :{product.width}</li>
              <li className="detail_item">Diametr :{product.diameter}</li>
            </ul>
            <div className="size" style={{ marginTop: "10px" }}>
              <div className="size-buttons">
                <button
                  className="size-btn"
                  name="size"
                  value="3"
                  onClick={(e) => {
                    setCreditType(e.target.value);
                  }}
                >
                  3 oy
                </button>
                <button
                  className="size-btn"
                  name="size"
                  value="6"
                  onClick={(e) => {
                    setCreditType(e.target.value);
                  }}
                >
                  6 oy
                </button>
                <button
                  className="size-btn"
                  name="size"
                  value="9"
                  onClick={(e) => {
                    setCreditType(e.target.value);
                  }}
                >
                  9 oy
                </button>
              </div>
            </div>
            <div className="color"></div>
            <p className="color price" style={{ marginTop: "30px" }}></p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="notFound">
          <p>Mahsulot topilmadi!</p>
        </div>
      );
    }
  }

  return (
    <>
      <div className="container">
        <RenderProduct product={product} />
        <div className="navbar_product">
          <button
            className="orderBtn"
            style={{ marginTop: "1px" }}
            onClick={() => {
              orderProduct(product._id);
            }}
          >
            Buyurtma berish
          </button>
          <Link to={"/"} className="linker">
            Asosiy menu
          </Link>
        </div>
      </div>
    </>
  );
}
