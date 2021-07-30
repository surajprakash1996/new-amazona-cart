const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401).send({
        message: "Authentication Fail.",
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
  
    res.status(500).send({
      message: err.message,
    });
  }
};
