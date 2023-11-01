import React, { useEffect, useState } from "react";
import queryString from "query-string";
import "./AddProduct.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const EditProduct = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin");
  if (!isAdmin) {
    Swal.fire({
      icon: "error",
      title: "You need to be an admin!",
      showConfirmButton: false,
      timer: 1500,
    });
    navigate("/admin");
  }
  const location = useLocation();
  const { productId } = queryString.parse(location.search);

  const [oldProduct, setOldProduct] = useState({});
  useEffect(() => {
    async function getProduct() {
      const jsonData = (await axios.get(`${API_URL}/api/product/${productId}`))
        .data;
      setOldProduct(jsonData);
    }
    getProduct();
  }, [productId]);

  const [product, setProduct] = useState({
    full_name: oldProduct.full_name,
    full_model: oldProduct.full_model,
    price_usd: oldProduct.price_usd,
    percent_3m: oldProduct.percent_3m,
    percent_6m: oldProduct.percent_6m,
    percent_9m: oldProduct.percent_9m,
    quantity: oldProduct.quantity,
    company: oldProduct.company,
    percent_cash: oldProduct.percent_cash,
    diameter: oldProduct.diameter,
    size: oldProduct.size,
    width: oldProduct.width,
  });

  const [image, setImage] = useState(oldProduct.image);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const submitResult = async () => {
    Swal.fire({
      title: "Success",
      text: "O'zgartirildi!",
      icon: "success",
    });
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    submitResult();
    // Submit to API
    const body = new FormData();
    body.append("image", image);
    for (let k in product) {
      if (!product[k] || product[k] === undefined) {
        product[k] = oldProduct[k];
      }
      body.append(k, product[k]);
    }
    const res = await fetch(
      process.env.REACT_APP_API_URL + "/api/product/update/" + productId,
      {
        method: "POST",
        body,
      }
    );

    if (res.ok) {
      return true;
    }
  };

  return (
    <>
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="form-container"
      >
        <input
          name="full_name"
          value={product.full_name}
          onChange={handleChange}
          placeholder="To'liq nomi"
        />
        <input
          name="full_model"
          value={product.full_model}
          onChange={handleChange}
          placeholder="modeli"
        />
        <input
          name="price_usd"
          value={product.price_usd}
          onChange={handleChange}
          placeholder="Narxi ($)"
        />
        <input
          name="percent_3m"
          type="number"
          value={product.percent_3m}
          onChange={handleChange}
          placeholder="3 oy ga "
        />
        <input
          name="percent_6m"
          type="number"
          value={product.percent_6m}
          onChange={handleChange}
          placeholder="6 oy ga "
        />
        <input
          name="percent_9m"
          type="number"
          value={product.percent_9m}
          onChange={handleChange}
          placeholder="9 oy ga "
        />

        <input
          name="quantity"
          type="number"
          value={product.quantity}
          onChange={handleChange}
          placeholder="Soni "
        />
        <input
          name="company"
          value={product.company}
          onChange={handleChange}
          placeholder="Kompaniyasi "
        />
        <input
          name="percent_cash"
          type="number"
          value={product.percent_cash}
          onChange={handleChange}
          placeholder="Naqtga"
        />
        <input
          name="diameter"
          type="number"
          value={product.diameter}
          onChange={handleChange}
          placeholder="Diametri "
        />

        <input
          name="size"
          value={product.size}
          onChange={handleChange}
          placeholder="O'lchami "
        />

        <input
          name="width"
          type="number"
          value={product.width}
          onChange={handleChange}
          placeholder="Uzunligi"
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          placeholder="Rasmi "
        />
        <button type="submit"> O'zgartirish </button>
      </form>
      <Link
        to={"/admin/home"}
        className="linker_addProduct"
        style={{ marginTop: "70px" }}
      >
        Asosiy menu
      </Link>
    </>
  );
};

export default EditProduct;
