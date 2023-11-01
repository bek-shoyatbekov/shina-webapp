import React, { useState } from "react";

import "./AddProduct.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddProduct = () => {
  const [product, setProduct] = useState({
    full_name: "",
    full_model: "",
    price_usd: "",
    percent_3m: "",
    percent_6m: "",
    percent_9m: "",
    quantity: "",
    company: "",
    percent_cash: "",
    diameter: "",
    size: "",
    width: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitResult = async () => {
    Swal.fire({
      title: "Success",
      text: "Yangi mahsulot qo'shildi !",
      icon: "success",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Submit to API
    const body = new FormData();
    body.append("image", image);
    for (let k in product) {
      body.append(k, product[k]);
    }
    const res = await fetch(process.env.REACT_APP_API_URL + "/api/product", {
      method: "POST",
      body,
    });

    if (res.ok) {
      submitResult();
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
          value={product.percent_3m}
          onChange={handleChange}
          placeholder="3 oy ga "
        />
        <input
          name="percent_6m"
          value={product.percent_6m}
          onChange={handleChange}
          placeholder="6 oy ga "
        />
        <input
          name="percent_9m"
          value={product.percent_9m}
          onChange={handleChange}
          placeholder="9 oy ga "
        />

        <input
          name="quantity"
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
          value={product.percent_cash}
          onChange={handleChange}
          placeholder="Naqtga"
        />
        <input
          name="diameter"
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
        <button type="submit">Add Product</button>
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

export default AddProduct;
