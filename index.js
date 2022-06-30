const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

let smtp_login = process.env.SMTP_LOGIN;
let smtp_password = process.env.SMTP_PASSWORD;
let mail_receiver = process.env.MAIL_RECEIVER;

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

app.post("/sendMessage", function (req, res) {
  const {name, email, phone, message} = req.body;

  const mailData = {
    from: smtp_login,
    to: mail_receiver,
    subject: "Message from Portfolio",
    html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Message: ${message}</p>`,
  };

  // send mail with defined transport object
  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      console.log(error);
    }
    res.status(200).send({message: "Mail send"});
  });
});

let port = process.env.PORT || 3010;

app.listen(port, function () {
  console.log(`Portfolio SMTP server is listening on port ${port}`);
});
