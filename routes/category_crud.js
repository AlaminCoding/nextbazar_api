const verify = require("../utils/verifyToken");
const Category = require("../models/category");
const router = require("express").Router();

//ADD CATEGORY
router.post("/addcategory", async (req, res) => {
  const newCategory = new Category({
    name: req.body.name,
  });
  try {
    const category = await newCategory.save();
    res.status(200).json(category);
  } catch (err) {}
});

//GET ONE CATEGORY
router.get("/:categoryId", async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json("Something Wrong, Muri Khao");
  }
});

//GET ALL CATEGORY
router.get("/", async (req, res) => {
  try {
    const allCategory = await Category.find();
    res.status(200).json(allCategory);
  } catch (err) {
    res.status(500).json("Something Wrong, Muri Khao");
  }
});

//UPDATE CATEGORY
router.put("/update/:categoryId", async (req, res) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.categoryId,
    { $set: req.body },
    { new: true }
  );
  res.status(200).json(updatedCategory);
});

//DELETE CATEGORY
router.delete("/delete/:categoryId", async (req, res) => {
  const deletedCategory = await Category.findByIdAndDelete(
    req.params.categoryId
  );
  res.status(200).json("Category Deleted");
});

module.exports = router;
