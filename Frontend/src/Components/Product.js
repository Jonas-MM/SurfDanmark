import React, { useState, useEffect } from "react";
import axios from "axios";

// made with hooks

function Product(props) {
  const [product, setProduct] = useState();

  // console.log(props.match.params.joke_id);

  useEffect(() => {
    axios
      .get("http://localhost:3004/products/" + props.match.params.product_id)
      .then(res => {
        const response = res.data;

        setProduct(response);
      });
  }, [props.match.params.product_id]);

  let theProduct= "";

  //   console.log(post);

  if (product !== undefined) {
    theProduct = (
      <div>
        <p>{product.productName}</p>
        <p>{product.brand}</p>
        <p>{product.price}</p>
        <img
          src={"http://localhost:3004/images/" + product.productImage.filename}
          alt=""
        />
      </div>
    );
  }

  return (
    <div>
      <h2>Et udvalgt product</h2>
      <p>{theProduct}</p>
    </div>
  );
}

export default Product;
