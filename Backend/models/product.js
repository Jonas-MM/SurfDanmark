const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: false
  },
  imgTxt: {
    type: String
  }
});

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true
    },
    brand: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    productImage: imgSchema
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema, "productcol");
