const express = require("express");
const connect = require("./configs/db");
require("dotenv").config();
const { register, login } = require("./controllers/auth.controller");
const { body, validationResult } = require("express-validator");
const teacherController = require("./controllers/teacher.controller");
const classController = require("./controllers/class.controller");

const PORT = process.env.PORT || 1212;
const app = express();

app.use(express.json());

app.use("/teachers", teacherController);
app.use("/classes", classController);

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


