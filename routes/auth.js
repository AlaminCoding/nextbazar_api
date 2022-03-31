const router = require("express").Router();
const User = require("../models/user");
const CryptoJs = require("crypto-js");
const JWT = require("jsonwebtoken");
//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJs.AES.encrypt(
      req.body.password,
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
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("Wrong Username or Password");
    const bytes = CryptoJs.AES.decrypt(user.password, process.env.CRYPTO_KEY);
    const originalPass = bytes.toString(CryptoJs.enc.Utf8);
    if (originalPass === req.body.password) {
      const accessToken = JWT.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.CRYPTO_KEY,
        { expiresIn: "10d" }
      );
      const { password, ...info } = user._doc;
      res.status(200).json({ ...info, accessToken });
    } else {
      res.status(500).json("Wrong Username or Password");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
