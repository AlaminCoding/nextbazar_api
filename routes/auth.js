const router = require("express").Router();
const User = require("../models/user");
const CryptoJs = require("crypto-js");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    passowrd: CryptoJs.AES.encrypt(
      req.body.passowrd,
      process.env.CRYPTO_KEY
    ).toString(),
  });

  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong Username");
    const bytes = CryptoJs.AES.decrypt(user.passowrd, process.env.CRYPTO_KEY);
    const originalPass = bytes.toString(CryptoJs.enc.Utf8);

    if (originalPass === req.body.password) {
      const { passowrd, ...info } = user._doc;
      res.status(200).json(info);
    } else {
      res.status(500).json("Wrong Password");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
