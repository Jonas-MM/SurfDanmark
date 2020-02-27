import React from "react";
import Axios from "axios";

//POST -- opret new product
export const createProduct = async (productData, imageData) => {
  try {
    const formdata = new FormData();
    formdata.append("product", JSON.stringify(productData));
    formdata.append("image", imageData);

    console.log(productData)

    let response = await Axios.post("http://localhost:3004/products");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//GET -- hent en bestemt cartoon
export const hentUdvalgt = async id => {
  try {
    let res = await Axios.get("http://localhost:3004/products/" + id);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// // PATCH -- ret existerende cartoon
// export const retProduct = async (productData, imageData) => {
//     try {
//       const formdata = new FormData();
//     //   formdata.append("cartoon", JSON.stringify(cartoonData));
//       formdata.append("billede", billedeData);

//       let response = await Axios.post("http://localhost:3004/cartoons");
//       return response.data;
//     } catch (error) {
//       console.log(error);
//     }
//   };
