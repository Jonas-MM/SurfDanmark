import React, { useState, useEffect } from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import Axios from "axios";
import { hentUdvalgt } from "../Helpers/ProductAPI";
import ImageUploader from "react-images-upload";

const ProductPatch = (props) => {
  const [product, setProduct] = useState({});
  const [productName, setProductName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [productImage, setProductImage] = useState();
  
  const history = useHistory();

  const { productId } = useParams();
  console.log(productName, brand, price, productImage);


  useEffect(() => {
    Axios.get("http://localhost:3004/products/" + props.match.params.product_id).then(res => {
        setProductName(res.data.productName);
        setBrand(res.data.brand);
        setPrice(res.data.price);
        setProductImage(res.data.coverImage.filename)
      console.log(res);
    });
  }, [props.match.params.product_id]);

//     const fetchData = () => {
//     Axios.get("http://localhost:3004/products/" + props.match.params.product_id).then(res => {
//       console.log(res);
//       setProduct(res.data);
//     });
//   };

//   window.onload = function() {
//     // init();
//     fetchData();
//   };
//   console.log(product);

  const handlesubmit = (e) => {
      e.preventDefault();
      console.log("dsa")
      Axios.patch("http://localhost:3004/products/" + props.match.params.product_id, {
            productName,
            brand,
            price,
            productImage

        })
      .then(alert("Produktet er nu rettet"));

  };
  

  return (
    <div>
      <h1>ret produkt</h1>
      <div className="row">
        <div className="col">
          <form onSubmit={handlesubmit}>
            <div className="form-group">
              <input
                name="productName"
                value={productName}
                onChange={e => setProductName( e.target.value )}
                type="text"
                rows="3"
                className="form-control"
                placeholder="Produktnavn"
              />
            </div>

            <div className="form-group">
              <input
                name="brand"
                value={brand}
                onChange={e => setBrand(e.target.value)}
                type="text"
                rows="3"
                className="form-control"
                placeholder="Produktets brand"
              />
            </div>

            <div className="form-group">
              <input
                name="price"
                value={price}
                onChange={e => setPrice( e.target.value )}
                type="text"
                rows="3"
                className="form-control"
                placeholder="Produktets pris"
              />
            </div>

            <ImageUploader
              withIcon={true}
              buttonText="vælg et billede"
              defaultValue={productImage}
              onChange={image => {
                setProductImage(image);
              }} //send kun et billede
              imgExtention={[".jpg", ".gif", ".png"]}
              maxFileSize={5242880}
              withPreview={true}
            />

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
};

export default ProductPatch;
