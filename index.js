const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

let smtp_login = process.env.SMTP_LOGIN || "----";
let smtp_password = process.env.SMTP_PASSWORD || "----";

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 465,
  secure: true,
  auth: {
    user: smtp_login,
    pass: smtp_password
  }
});

app.get("/", function (req, res) {
  res.send("Hello world!");
});

app.get("/sendMessage", async function (req, res) {
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "Portfolio page", // sender address
    to: "brilalex.portfolio@yandex.by", // list of receivers
    subject: "Hello from portfolio", // Subject line
    html: "<b>Hello world</b>", // html body
  });

  res.send("Email sent ok!");
});

let port = process.env.PORT || 3010;

app.listen(port, function () {
  console.log("Portfolio SMTP server is listening on port " + port);
});
