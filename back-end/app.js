/** @format */

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const connectedDB = require("./api/config/dbConnection");
const app = express();
const path = require('path');


const productRoutes = require("./api/routes/Product.routes");
const userRoutes = require("./api/routes/User.routes");
const orderRoutes = require("./api/routes/Order.routes");

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Db Connection
connectedDB();

app.use("/product", productRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);

app.get("/config/paypal/client-id", (req, res) => {
  res.status(200).send(process.env.PAYPAL_CLIENT_ID || 'sb');
})

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "/front-end/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front-end", "build", "index.html"));
  });
}

app.use((req, res, next) => {
  const error = new Error("Page not found");
  error.status = 404;
  next(error);
});


app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      msg: error.message,
    },
  });
});

module.exports = app;
