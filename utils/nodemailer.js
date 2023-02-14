const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "",
  port: 587,
  secure: faslse,
  auth: {
    user: "",
    pass: "",
  },
});

function sendMail(malOptions) {
  transporter.sendMail(malOptions, function (err, info) {
    console.log("Verification email sent.");
  });
}

module.exports = sendMail;
