const Razorpay = require("razorpay");
const crypto = require("crypto");

// const Order = require("../product/OrderSchema");

const razorpay = new Razorpay({
  key_id: "rzp_test_lO9zpzaPOIvkMr",
  key_secret: "NiXYSM7LjOrqyEc3dOxb1nGi",
});

const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Amount in paisa
      currency: "INR",
      receipt: "receipt_order_" + Math.floor(Math.random() * 1000000),
    };

    const order = await razorpay.orders.create(options);
    res.json({
      order_id: order.id, // Send as `order_id`
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    res.status(500).json({ error: "Razorpay order creation failed" });
  }
};

// Verify Razorpay Signature

const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  let secret = "NiXYSM7LjOrqyEc3dOxb1nGi";

  const generated_signature = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");
  console.log(generated_signature);
  console.log(razorpay_signature);

  if (generated_signature === razorpay_signature) {
    res.json({ message: "Payment verified successfully" });
  } else {
    res.status(400).json({ message: "Invalid signature" });
  }
};

module.exports = {
  createRazorpayOrder,
  verifyPayment,
};
