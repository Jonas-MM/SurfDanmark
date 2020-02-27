import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = props => {
  const [products, setProducts] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3004/products").then(res => {
      console.log(res);
      setProducts(res.data);
    });
  }, []);

  const ProductsList = products.length ? (
    products.map(product => {
      return (
        <div className="container" key={product._id}>
          <div className="card">
            <Link to={"/" + product._id}>
              <span className="card-title red-text"> se produktet </span>
            </Link>
            <p> - {product.productName}</p>
            <p> - {product.brand}</p>
            <p> - {product.price}</p>
            <img
              src={
                "http://localhost:3004/images/" + product.coverImage.filename
              }
              alt=""
            />
            <br />
          </div>
        </div>
      );
    })
  ) : (
    <div className="center">No posts yet</div>
  );
  return <div className="container">{ProductsList}</div>;
};

// mongodb://localhost/jokes
// http://localhost:3000/jokes

export default Home;
