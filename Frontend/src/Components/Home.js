import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

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
          <div className="col col-lg-3 mb-5">
          <div className="card">

          <img className="img-fluid"
              src={
                "http://localhost:3004/images/" + product.productImage.filename
              }
              alt=""
            />

            
            <p> - {product.productName}</p>
            <p> - {product.brand}</p>
            <p> - {product.price}</p>
            <Link to={"/" + product._id}>
              <span className="card-title red-text"> se produktet </span>
            </Link>

            <br />
          </div>
        </div>
      );
    })
  ) : (
    <div className="center">No posts yet</div>
  );
  return <div className="container">
      <div className="d-flex row justify-content-md-center">
        {ProductsList}
      </div>
    </div>;
};

// mongodb://localhost/jokes
// http://localhost:3000/jokes

export default Home;
