const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const sendOTP = async (req, res) => {
  try {
    const { email, mobile } = req.body;

    if (!email && !mobile) {
      return res
        .status(400)
        .json({ message: "Either email or mobile is required" });
    }

    const otp = "123456"; // here i am using a static OTP for demonstration

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, mobile, otp } = req.body;

    if (!email && !mobile) {
      return res.status(400).json({
        message: "Either email or mobile is required",
      });
    }

    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    if (otp !== "123456") {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    let user;

    if (email) {
      user = await UserModel.findOne({ email });
    } else {
      user = await UserModel.findOne({ mobile });
    }

    if (!user) {
      user = await UserModel.create({ email, mobile });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ loggedIn: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.json({
      loggedIn: true,

      user: decoded.user,
    });
  } catch (error) {
    return res.json({ loggedIn: false });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  return res.json({
    success: true,

    message: "Logged out",
  });
};

module.exports = {
  sendOTP,
  verifyOTP,
  getMe,
  logout,
};
