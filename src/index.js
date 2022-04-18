const express = require("express");
const connect = require("./configs/db");
require("dotenv").config();
const { register, login } = require("./controllers/auth.controller");
const { body, validationResult } = require("express-validator");
const productController = require("./controllers/product.controller");

const PORT = process.env.PORT || 1212;
const app = express();

app.use(express.json());
// app.use("/users", userController);
app.use("/products", productController);
app.post(
  "/register",
  body("name").notEmpty().withMessage("Please Provide Valid first name"),
  body("email").notEmpty().isEmail().withMessage("Please Provide Valid email"),
  body("password").notEmpty().withMessage("Please Provide Valid last name"),
  register
);
app.post(
  "/login",
  body("name").notEmpty().withMessage("Please Provide Valid first name"),
  body("email").notEmpty().isEmail().withMessage("Please Provide Valid email"),
  body("password").notEmpty().withMessage("Please Provide Valid last name"),
  login
);

app.listen(PORT, async () => {
  try {
    await connect();
  } catch (err) {
    console.log(err.message);
  }
  console.log("Listening on port 1212");
});


