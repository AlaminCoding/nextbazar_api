const verify = require("../verifyToken");
const Category = require("../models/category");
const router = require("express").Router();

//ADD CATEGORY
router.post("/addcategory", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newCategory = new Category({
      name: req.body.name,
    });
    try {
      const category = await newCategory.save();
      res.status(200).json(category);
    } catch (err) {}
  } else {
    res.status(500).json("You are not admin");
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
router.put("/update/:categoryId", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.categoryId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } else {
    res.status(500).json("You are not admin");
  }
});

//DELETE CATEGORY
router.delete("/delete/:categoryId", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const deletedCategory = await Category.findByIdAndDelete(
      req.params.categoryId
    );
    res.status(200).json("Category Deleted");
  } else {
    res.status(500).json("You are not admin");
  }
});

module.exports = router;
