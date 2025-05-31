const express = require("express");
const {
  placeOrder,
  createProduct,
  uploadImages,
  ProductGet,
} = require("../controller/ProductCrud");
const {
  RegRead,
  RegPost,
  RegDelete,
  RegUpdate,
  forgotPassword,
  resetPassword,
  Login,
  verifyToken,
  verifyGoogleLogin,
} = require("../controller/RegCrud");
const {
  verifyPayment,
  createRazorpayOrder,
} = require("../controller/PaymentController");
const router = express.Router();

// router.get("/ProductRead", ProductGet);

// reg crud
router.get("/RegRead", verifyToken, RegRead);
router.post("/RegPost", RegPost);
router.delete("/RegDelete/:id", RegDelete);
router.put("/RegUpdate/:id", RegUpdate);
router.post("/forgetPassword", forgotPassword);
router.post("/reset-Password/:token", resetPassword);
router.post("/Login", Login);
router.post("/GoogleLogin", verifyGoogleLogin);

// product crud

router.post("/CreateProduct", uploadImages, createProduct);

router.post("/place-order", placeOrder);
router.get("/ProductRead", ProductGet);

// payment Getway Rezorpay method
router.post("/createRazorpayOrder", createRazorpayOrder);
router.post("/verify-payment", verifyPayment);
module.exports = router;
