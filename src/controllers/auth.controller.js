const User = require("../models/user.model");
const { body, validationResult } = require("express-validator");

require("dotenv").config();

var jwt = require("jsonwebtoken");

let newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
  try {
    // validation 
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // validation end

    // Authnticate suru 
    let user = await User.findOne({ email: req.body.email });

    if (user) return res.status(400).send("Please fill another email address.");

    user = await User.create(req.body);

    let token = newToken(user);

    res.send({ user, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send("email or password is incorrect");

    const match = user.checkPassword(req.body.password);

    if (!match) return res.status(400).send("email or password is incorrect");

    let token = newToken(user);
    res.send({ user, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { register, login };
