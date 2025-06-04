const Order = require("../product/OrderSchema");
const Product = require("../product/productSchema");
const RegUser = require("../Regiter/regSchema"); // your registration model
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../../frontend/src/cartImage"); // go one level up and into 'uploads' folder
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Math.floor(Math.random() * Date.now()) + path.extname(file.originalname)
    ); // unique name
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only JPEG and PNG files are allowed!"));
  },
});
// Accept 1 file for 'singleimg' and up to 5 files for 'multiimg'
const uploadImages = upload.fields([
  { name: "singleimg", maxCount: 1 },
  { name: "multiimg", maxCount: 5 },
]);

// POST /api/product/create
async function createProduct(req, res) {
  try {
    const singleimgPath = req.files["singleimg"]
      ? req.files["singleimg"][0].path
      : null;

    const multiimgPaths = req.files["multiimg"]
      ? req.files["multiimg"].map((file) => file.path)
      : [];

    const newProduct = new Product({
      title: req.body.title,
      quantity: req.body.quantity,
      price: req.body.price,
      singleimg: singleimgPath,
      multiimg: multiimgPaths,
      productstock: req.body.productstock,
      offerExpire: req.body.offerExpire,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function ProductGet(req, res) {
  try {
    const GetData = await Product.find();

    res.json({ msg: "Data fetched successfully!", Productdata: GetData });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// Assuming req.body contains userId, email, productId, quantity
async function placeOrder(req, res) {
  try {
    const { userId, productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).send("Product not found");

    const user = await RegUser.findById(userId);
    console.log(user);

    if (!user) return res.status(400).send("User mismatch");

    if (quantity > product.productstock) {
      return res.status(400).send("Insufficient stock for this product");
    }
    const order = new Order({
      user: userId,
      email: user.email,
      product: productId,
      quantityOrdered: quantity,
      totalPrice: quantity * product.price,
    });

    await order.save();
    res.status(201).send({
      msg: "Order placed successfully",
      user: { name: user.name, email: user.email },
      order: {
        product: product.title,
        quantityOrdered: order.quantityOrdered,
        totalPrice: order.totalPrice,
      },
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = { placeOrder, createProduct, uploadImages, ProductGet };
