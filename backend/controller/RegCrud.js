const regSchema = require("../Regiter/regSchema");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "1020483017074-er3qccc74j6er788ldh3lsmala2p5bnh.apps.googleusercontent.com"
);
const RegRead = async (req, res) => {
  if (req.user.role === "admin") {
    try {
      const ReadData = await regSchema.find();
      res.json({ msg: "Data fetched successfully!", Userdata: ReadData });
    } catch (err) {
      res.status(500).json({ errmsg: "Server error", error: err.message });
    }
  } else {
    res.status(401).json({ msg: "only Access Admin" });
  }
};

const RegPost = async (req, res) => {
  try {
    const hasspass = await bcrypt.hash(req.body.password, 10);
    const data = new regSchema({ ...req.body, password: hasspass });
    const findEmail = await regSchema.findOne({ email: req.body.email });
    if (findEmail) {
      return res.json({
        errmsg: "Email already exists!",
        msg: "Please use a different email.",
      });
    }

    const SaveData = await data.save();
    res.json({ msg: "Data created successfully!", Userdata: SaveData });
  } catch (err) {
    res.status(500).json({ errmsg: "Server error", error: err.message });
  }
};

const RegUpdate = async (req, res) => {
  try {
    const { name } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;

    const UpdateData = await regSchema.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );

    res.json({ msg: "Data updated successfully!", Userdata: UpdateData });
  } catch (err) {
    res.status(500).json({ errmsg: "Server error", error: err.message });
  }
};

const RegDelete = async (req, res) => {
  try {
    const DeleteData = await regSchema.findByIdAndDelete(req.params.id);
    res.json({ msg: "Data deleted successfully!", Userdata: DeleteData });
  } catch (err) {
    res.status(500).json({ errmsg: "Server error", error: err.message });
  }
};

// ForgetPassword

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.nodemail,
      pass: process.env.modemailPass, // Use App Password, not your Gmail password
    },
  });
  try {
    const user = await regSchema.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Generate reset token (or random code)
    const resetToken = Math.random().toString(36).slice(-8); // Simple code

    // Save to DB temporarily
    user.resetPass = resetToken;
    await user.save();

    // Send email
    await transporter.sendMail({
      from: process.env.nodemail,
      to: email,
      subject: "Password Reset",
      html: `<p>Hello ${user.name},</p>
             <p>Your password reset code is: <b>${resetToken}</b></p>
             <p>Use this code to reset your password.</p>`,
    });

    res.json({ msg: "Reset code sent to email" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await regSchema.findOne({ resetPass: token });

    if (!user) {
      return res.status(400).json({ msg: "Invalid token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPass = null;
    await user.save();

    res.json({ msg: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

const verifyGoogleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    // Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "1020483017074-er3qccc74j6er788ldh3lsmala2p5bnh.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;

    // Check if user exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(401)
        .json({ msg: "User email not registered in system" });

      // OR, to auto-register Google user:
      // const newUser = new User({ name, email, role: "user" });
      // await newUser.save();
      // existingUser = newUser;
    }

    // Generate JWT token
    const jwtToken = await jwt.sign(
      {
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ msg: "Google Login successful", token: jwtToken });
  } catch (err) {
    res.status(401).json({ msg: "Invalid Google token", error: err.message });
  }
};

const Login = async (req, res) => {
  try {
    const FindEmail = await regSchema.findOne({ email: req.body.email });
    if (!FindEmail) return res.json({ errmsg: "Email not found!" });

    const Findpassword = await bcrypt.compare(
      req.body.password,
      FindEmail.password
    );
    if (!Findpassword) return res.json({ errmsg: "password not found!" });

    let jwtToken = await jwt.sign(
      { name: FindEmail.name, email: FindEmail.email, role: FindEmail.role },
      process.env.JWT_SECRET
    );

    res.json({ msg: "Login successfully", token: jwtToken });
  } catch (err) {
    res.json(err);
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid token", error: err.message });
  }
};
module.exports = {
  RegRead,
  RegPost,
  RegDelete,
  RegUpdate,
  forgotPassword,
  resetPassword,
  verifyToken,
  Login,
  verifyGoogleLogin,
};
