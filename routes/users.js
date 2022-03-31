const router = require("express").Router();
const verify = require("../verifyToken");
const CRYPTO = require("crypto-js");
const User = require("../models/user");

//USER UPDATE
router.put("/:userId", verify, async (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CRYPTO.AES.encrypt(
        req.body.password,
        process.env.CRYPTO_KEY
      );
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("You can not update it");
  }
});

//USER DELETE
router.delete("/:userId", verify, async (req, res) => {
  if (req.user.id === req.params.userId || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.status(200).json("User Deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

//GET ALL Users
router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});
module.exports = router;
