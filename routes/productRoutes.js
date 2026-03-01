const express = require("express");
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Multer Storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Add Product
router.post("/add-product", upload.single("image"), async (req, res) => {
  try {
    const { title, description, price } = req.body;

    const product = new Product({
      title,
      description,
      price,
      image: req.file.filename
    });

    await product.save();
    res.json({ message: "Product Added Successfully" });

  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Get Products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;