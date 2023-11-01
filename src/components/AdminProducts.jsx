import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

import axios from "axios";
import "./AdminProducts.css";
import Swal from "sweetalert2";

const API_URL = process.env.REACT_APP_API_URL;

export default function AdminProducts() {
  const location = useLocation();

  const { username, userContact } = queryString.parse(location.search);

  localStorage.setItem("username", username);
  localStorage.setItem("userContact", userContact);

  const [categories, setCategories] = useState([]);

  const [sizes, setSizes] = useState([]);

  const [category, setCategory] = useState("all");

  const [selectedSize, setSelectedSize] = useState("all");

  const [products, setProducts] = useState([]);

  const [currency, setCurrency] = useState(0);

  useEffect(() => {
    async function getCurrency() {
      try {
        const jsonData = (await axios.get(`${API_URL}/api/currency`)).data;
        setCurrency(jsonData.data.val);
      } catch (err) {
        console.log(err);
      }
    }
    getCurrency();
  });

  useEffect(() => {
    async function getProducts() {
      try {
        const jsonData = (await axios.get(`${API_URL}/api/products`)).data;
        setCategories(
          Array.from(
            new Set(jsonData.map((product) => product.full_model.trim()))
          )
        );
        setProducts(jsonData);
        setSizes(getSizeOfProducts(products));
      } catch (err) {
        console.log(err);
      }
    }
    getProducts();
  }, [products]);

  let filteredProducts = [];
  if (category === "all") {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(
      (product) => product.full_model.trim() === category
    );
  }
  if (selectedSize !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => getSizeOfProduct(product) === selectedSize
    );
  }

  const submitResult = () => {
    Swal.fire({
      title: "Success",
      text: "O'zgartirildi!",
      icon: "success",
    });
  };

  async function handleDeleteProduct(e) {
    const productId = e.target.value;
    const res = await fetch(
      process.env.REACT_APP_API_URL + `/api/product/delete/${productId}`,
      { method: "GET" }
    );
    if (res.status === 200) {
      submitResult();
    }
  }

  const updateCurrency = () => {
    Swal.fire({
      title: "Kursni yangilash ",
      input: "number",
      inputValue: currency,
      inputPlaceholder: "Yangi kursni kiriting ",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.value) {
        const res = await fetch(
          process.env.REACT_APP_API_URL +
            `/api/currency/update?newCurrencyRate=${result.value}`,
          { method: "GET" }
        );
        if (res.status === 200) {
          submitResult();
        }
        setCurrency(result.value);
      }
    });
  };

  function RenderProduct({ products }) {
    if (products.length > 0) {
      return products.map((product) => (
        <div className="card_admin" id="card">
          <div className="imgBx_admin" id="imbox">
            <img
              id="wheel"
              className="wheel_admin"
              src={
                product.image.split("/").slice(3).join("").startsWith("BQ") ||
                product.image.split("/").slice(3).join("").startsWith("AgA")
                  ? API_URL + "/" + product.image.split("/").slice(2).join("/")
                  : API_URL + "/images/" + product.image
              }
              alt={product.full_model}
            />
          </div>
          <div className="contentBx_admin" id="contentBx">
            <p className="color_admin model_admin">{product.full_name}</p>
            <div className="size_admin" style={{ marginTop: "20px" }}></div>
            <div className="color_admin"></div>
            <p
              className="color_admin price_admin"
              style={{ marginTop: "30px" }}
            ></p>
            <Link to={`/admin/edit?productId=${product._id}`}>
              {" "}
              O'zgartirish{" "}
            </Link>
            <button
              type="button"
              className="btn btn-danger"
              value={product._id}
              onClick={handleDeleteProduct}
            >
              <i className="fa-solid fa-trash"></i> Delete
            </button>
          </div>
        </div>
      ));
    } else {
      return (
        <div className="notFound_admin">
          <h1>Mahsulot topilmadi!</h1>
        </div>
      );
    }
  }

  return (
    <>
      <div className="container_admin">
        <RenderProduct
          products={filteredProducts}
          style={{ marginBottom: "300px" }}
        />
        <div className="navbar_admin" style={{ marginTop: "200px" }}>
          <select
            className="filter_admin  category-filter_admin"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">Shina turlari</option>
            {categories.map((category) => (
              <option key={category} value={category.trim()}>
                {category}
              </option>
            ))}
          </select>
          <select
            className="filter_admin  size-filter_admin"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="all">O'lcham tanlash</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <Link
            to={"/admin/add"}
            className="linker"
            style={{ width: "150px", height: "34px" }}
          >
            Add Product
          </Link>
          <button
            className="linker"
            style={{
              width: "190px",
              height: "54px",
              border: "none",
              fontSize: "17px",
            }}
            onClick={updateCurrency}
          >
            Change Currency
          </button>
        </div>
      </div>
    </>
  );
}

function getSizeOfProducts(products) {
  return Array.from(
    new Set(
      products.map(
        (product) =>
          product.full_name.split(" ")[product.full_name.split(" ").length - 1]
      )
    )
  );
}

function getSizeOfProduct(product) {
  let len = product.full_name.split(" ").length;
  return product.full_name.split(" ")[len - 1];
}
