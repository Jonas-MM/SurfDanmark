import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductAdmin = () => {
  const [products, setProducts] = useState({});
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get("http://localhost:3004/products").then(res => {
      console.log(res);
      setProducts(res.data);
      // console.log(jokes);
    });
  };

  const handleDelete = id => {
    if (window.confirm("Sikker på at du vil slette dette produkt?")) {
      axios.delete("http://localhost:3004/products/" + id).then(res => {
        console.log(handleDelete);

        fetchData();
      });
    }
  };

  const productsList = products.length ? (
    products.map(product => {
      return (
        <div className="container" key={product._id}>
          <div className="card">
            {/* <Link to={"/" + quote._id}>
              <span className="card-title red-text"> {quote.overskrift} </span>
            </Link> */}
            <p>{product.productName}</p>
            <p>{product.brand}</p>
            <p>{product.price}</p>
            <img
            src={"http://localhost:3004/images/" + product.coverImage.filename}
            alt=""
            />
            <button onClick={() => handleDelete(product._id)}>Slet</button>
            <Link to={`/productpatch/${product._id}`}>Ret produkt</Link>
          </div>
        </div>
      );
    })
  ) : (
    <div className="center">No posts yet</div>
  );
  return (
    <div className="container">
      <div className="container">
        <h3>ADMIN</h3>
      </div>
      {productsList}
    </div>
  );
};

// mongodb://localhost/jokes
// http://localhost:3000/jokes

export default ProductAdmin;
