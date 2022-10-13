var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "khalishluthfi1@gmail.com",
    pass: "bguhfyojgwywlfnh", // inih sudah pke dummy email real
  },
});

var mailOptions = {
  from: "hcteeeeep88@gmail.com",
  to: "khalishluthfi@gmail.com", // disini bebas masukin emai sapa aja 
  subject: "Sending Email using Node.js",
  text: "selamat  nilai PP anda adalah 100!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
