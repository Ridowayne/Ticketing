const User = require("../models/user.model");
const AppError = require("../utils/appError");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/nodemailer");

exports.login = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    if (!email || !password) {
      return new AppError(
        "Kindly provide the email and password to be logged in to your account",
        404
      );
    }
    const user = await User.findone({ email: email }).select("+password");
    if (user.isverified === false)
      return next(new AppError("This account is yet to be verified."));
    if (!user || !(await bcrypt.compare(password, user.password)))
      return next(new AppError("incorrect password or email address", 404));
  } catch (error) {}
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const mailOptions = {
      from: "",
      to: newUser.email,
      subject: " verify account",
    };
    sendMail(mailOptions);
    return res.status(201).json({
      status: "success",
      message: "created successfully",
      data: newUser,
    });
  } catch (error) {
    return next(error);
  }
};
exports.forgotPassword = async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email) return next(new AppError("Kindly provide an email address"));
    const user = await User.findone({ email: email });
    if (!user)
      return next(
        new AppError(
          "No account associated to this email address, kindly check the email address to be sure it is valid"
        )
      );
    const mailOptions = {
      from: "",
      to: user.email,
      subject: "Reset password",
    };
    sendMail(mailOptions);
  } catch (error) {}
};
