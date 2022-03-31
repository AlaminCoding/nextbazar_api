const router = require("express").Router();
const Product = require("../models/product");
//ADD PPRODUCT
router.post("/addproduct", async (req, res) => {
  const product = new Product({
    name: { type: String, required: true },
    image: { type: String },
    category: { type: String },
    description: { type: String },
    rating: { type: Number },
    price: { type: Number, required: true },
    onSell: { type: Boolean, default: false },
    sellPrice: { type: Number },
    count: { type: Number },
    sellCount: { type: Number },
    favourite: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  });
});
