import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { createProduct } from "../Helpers/ProductAPI";
import ImageUploader from "react-images-upload";
import Axios from "axios";

function ProductCreate() {
  const [product, setProduct] = useState({});
  const [productImage, setProductImage] = useState({});
  const history = useHistory();




  console.log(product, productImage );
  // Når der klikkes på GEM - kald api'et og send cartoon (fra state) med


  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("product", JSON.stringify(product));
    formData.append('myImage', productImage.file);
    const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
    };
    console.log(formData);

  
    Axios.post("http://localhost:3004/products", formData, config )
    .then(res => {
        history.push("/");
    })
    .then(alert("Dit produkt er nu gemt"))
    .catch(error => {
        console.log(error);
    }) 


    


    // createProduct(product, productImage)
    //   .then(alert("Dit produkt er gemt"))
    //   .then(history.push("/"));
    // console.log(product);
  };

  // const fetchData = () => {
  //   axios.get("http://localhost:3004/cartoons").then(res => {
  //     // console.log(res);
  //     setCartoon(res.data);
  //   });
  // };

  // window.onload = function() {
  //   // init();
  //   fetchData();
  // };

  const onChange = e => {
    setProductImage({file:e.target.files[0]});
}

  return (
    <div className="container">
    <div className="row">
      <div className="col">
        <h5 className="my-4">Opret et produkt</h5>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              name="productName"
              value={product.productName || ''}
              onChange={e => setProduct({ ...product, productName: e.target.value })}
              type="text"
              rows="3"
              className="form-control"
              placeholder="produktnavn"
            />
          </div>

          <div className="form-group">
            <input
              name="brand"
              value={product.brand || ''}
              onChange={e => setProduct({ ...product, brand: e.target.value })}
              type="text"
              rows="3"
              className="form-control"
              placeholder="brand"
            />
          </div>

          <div className="form-group">
            <input
              name="price"
              value={product.price || ''}
              onChange={e => setProduct({ ...product, price: e.target.value })}
              type="number"
              rows="3"
              className="form-control"
              placeholder="pris"
            />
          </div>

          <input type="file" name="myImage" onChange= {onChange} />
          {/* <ImageUploader
            withIcon={true}
            buttonText="vælg et billede"
            onChange={image => {
              setProductImage(image[0]);
            }}
             //send kun et billede
            imgExtention={[".jpg", ".gif", ".png"]}
            maxFileSize={5242880}
            type="file"
            withPreview={true}
          /> */}

          <button
            type="button"
            className="btn btn-success mr-3"
            onClick={() => {
              history.push("/home");
            }}
          >
            Fortryd{" "}
          </button>
          <button type="submit" className="btn btn-primary">
            Gem produkt
          </button>
        </form>
      </div>
    </div>
    </div>

  );
}
export default ProductCreate;
