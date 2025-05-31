const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "regSchema",
  },
  email: String,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  quantityOrdered: Number,
  totalPrice: Number,

  // Razorpay related fields
  razorpay_order_id: String,
  razorpay_payment_id: String,
  razorpay_signature: String,
  status: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Order", orderSchema);
