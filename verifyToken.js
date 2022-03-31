const JWT = require("jsonwebtoken");

function verify(req, res, next) {
  const accessToken = req.headers.token;
  if (accessToken) {
    const token = accessToken.split(" ")[1];
    JWT.verify(token, process.env.CRYPTO_KEY, (err, user) => {
      if (err) {
        res.status(500).json("Invalid Token! Boom");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(500).json("You are not Autheticated");
  }
}

module.exports = verify;
