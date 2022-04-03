const router = require("express").Router();
const Product = require("../models/product");
const verify = require("../verifyToken");
//ADD PPRODUCT
router.post("/addproduct", verify, async (req, res) => {
  const {
    name,
    image,
    category,
    description,
    rating,
    price,
    onsell,
    sellPrice,
    count,
    sellCount,
    favourite,
    active,
  } = req.body;
  const newProduct = new Product({
    name: name,
    image: image,
    category: category,
    description: description,
    rating: rating,
    price: price,
    onSell: onsell,
    sellPrice: sellPrice,
    count: count,
    sellCount: sellCount,
    favourite: favourite,
    active: active,
  });
  if (req.user.isAdmin) {
    try {
      const product = await newProduct.save();
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json("You are not admin");
    }
  }
});

//GET ONE PRODUCT
router.get("/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findById(req.params.productId);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get All Product
router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json("Product Not Found");
  }
});

//UPDATE A PRODUCT
router.put("/update/:productId", verify, async (req, res) => {
  const productId = req.params.productId;
  try {
    if (req.user.isAdmin) {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } else {
      res.status(500).json("You are not admin");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//PRODUCT DELETE
router.delete("/delete/:productId", verify, async (req, res) => {
  const productId = req.params.productId;
  try {
    if (req.user.isAdmin) {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      res.status(200).json("Product Deleted");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
