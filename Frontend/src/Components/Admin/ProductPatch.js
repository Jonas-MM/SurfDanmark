import React, { useState, useEffect } from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import Axios from "axios";
import { hentUdvalgt } from "../Helpers/ProductAPI";
import ImageUploader from "react-images-upload";

const ProductPatch = (props) => {
  const [product, setProduct] = useState({});
  const [productImage, setProductImage] = useState({});
  const history = useHistory();
  

  const { productId } = useParams();

  // console.log(product, productImage);


  useEffect(() => {
    Axios.get("http://localhost:3004/products/" + props.match.params.product_id).then(res => {
      setProduct(res.data);
      // setProductImage(res.data.productImage)
      console.log(res);
    });
  }, [props.match.params.product_id]);

  const handlesubmit = (e) => {
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

      Axios.patch("http://localhost:3004/products/" + props.match.params.product_id, formData, config )
      .then(alert("Produktet er nu rettet"))
      .catch(error => {
        console.log(error);
    }) 

  };
  
  const onChange = e => {
    setProductImage({file:e.target.files[0]});
}
  return (
    <div>
      <h1>ret produkt</h1>
      <div className="row">
        <div className="col">
          <form onSubmit={handlesubmit}>
            <div className="form-group">
              <input
                name="productName"
                value={product.productName || ''}
                onChange={e => setProduct({ ...product, productName: e.target.value })}
                type="text"
                rows="3"
                className="form-control"
                placeholder="Produktnavn"
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
                placeholder="Produktets brand"
              />
            </div>

            <div className="form-group">
              <input
                name="price"
                value={product.price || ''}
                onChange={e => setProduct({ ...product, price: e.target.value })}
                type="text"
                rows="3"
                className="form-control"
                placeholder="Produktets pris"
              />
            </div>
            <input type="file" name="myImage" onChange= {onChange} />

            {/* <ImageUploader
              withIcon={true}
              buttonText="vælg et billede"
              defaultValue={productImage}
              onChange={image => {
                setProductImage(image);
              }} //send kun et billede
              imgExtention={[".jpg", ".gif", ".png"]}
              maxFileSize={5242880}
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
};

export default ProductPatch;
