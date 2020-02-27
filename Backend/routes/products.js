const express = require("express");
const router = express.Router();
const Product = require("../models/product");


//Multer - required for images
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cd) {
      cd(null, "public/images/");
    },
    filename: function(req, file, cd) {
      cd(null, Date.now() + "-" + file.originalname);
    }
  })
});



//function for getting all products --- GET ---
router.get("/", async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ massage: err.massage });
    }
  });



//Getting One --- GET ---
router.get("/:id", getProduct, (req, res) => {
    res.json(res.product);
  });





//function for creating a product --- POST ---
router.post("/", upload.single("image"), async (req, res) => {
    try {
      let i = JSON.parse(req.body.product);
  
      const postedProduct = new Product({
        productName: i.productName,
        brand: i.brand,
        price: i.price,
        coverImage: { filename: req.file.filename } // anden sti fordi der er et andet skema
      });
  
      const newProduct = await postedProduct.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });




  //function for updating One --- PATCH ---
router.patch("/:id", upload.single("image"), getProduct, async (req, res) => {
    try {
      let p = JSON.parse(req.body.product);
  
      if (p.productName != null) {
        res.product.productName = p.productName;
      }
      if (p.brand != null) {
        res.product.brand = p.brand;
      }
      if (p.price != null) {
        res.product.price = p.price;
      }
  
      //If image is in the request
      if (req.file) {
        res.product.coverImage = { filename: req.file.filename };
      }
  
      const updatedProduct = await res.product.save();
      res.status(200).json(updatedProduct);
      
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


// router.patch("/:id", upload.single("coverImage"), getProduct, async (req, res) => {
      
//   catch (err) {
//         res.status(400).json({ message: err.message });
//       }
//     });




//Deleting One --- DELETE ---
router.delete("/:id", getProduct, async (req, res) => {
    try {
      await res.product.remove();
      res.json({ message: "Deleted product" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });





//function for getting ID
  async function getProduct(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id);
      if (product == null) {
        return res.status(404).json({ message: "Cannot find product" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.product = product;
    next();
  }




  module.exports = router;