const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  category: { type: String },
  description: { type: String },
  rating: { type: Number, default: null },
  price: { type: Number, required: true },
  onSell: { type: Boolean, default: false },
  sellPrice: { type: Number, default: null },
  count: { type: Number },
  sellCount: { type: Number, default: 0 },
  favourite: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model("Product", ProductSchema);
