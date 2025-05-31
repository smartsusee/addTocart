const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  quantity: Number,
  price: Number,
  singleimg: String,
  multiimg: [String], // array of image URLs
  productstock: Number,
  offerExpire: Date, // product offer expiry time
});

module.exports = mongoose.model("Product", productSchema);
