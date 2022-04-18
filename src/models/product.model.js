const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    user_id: { type:mongoose.Schema.Types.ObjectId, required: true},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('Product', productSchema)
