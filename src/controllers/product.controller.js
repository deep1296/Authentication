const express = require("express");
const authenticate = require("../middleware/authenticate");
const Product = require("../models/product.model");

const authorise = require("../middleware/authorazition") // chnage

const router = express.Router();

router.post("/", authenticate, async (req, res) => {
  //console.log(req.user);
  try {
    const product = await Product.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.user._id,
    });
    return res.status(200).send(product);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

// changes
router.patch("/:id",
  authenticate,
  authorise(["seller", "admin"]),
  async (req, res) => {
     
    try{
      product = await Product.findByIdAndUpdate(req.params.id ,req.body,{new:true} );

      return res.status(201).send(product)
    }
   catch(err){
     return res.status(500).send(err.message)
   }

  
  })

module.exports = router;
