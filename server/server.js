"use strict";

const express = require("express");
const app = express();
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const webpagesPath = path.join(__dirname, "../webpages");
const imagesPath = path.join(__dirname, "../images");

app.use("/", (req, res, next) => {
  console.log(new Date(), req.method, req.url);
  next();
});
app.use("/", express.static(webpagesPath));
app.use("/images", express.static(imagesPath));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../webpages/" + "home.html"));
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

app.post("/api/sendMail", sendMail);

let GMAIL_USER = process.env.GMAIL_USER;
let GMAIL_PASS = process.env.GMAIL_PASS;

function sendMail(req, res) {
  let smtpTrans = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS
    }
  });

  let mailOpts = {
    from: req.query.sendmail,
    to: GMAIL_USER,
    subject: req.query.subject,
    text:
      "Message sent from " +
      req.query.name +
      ", via " +
      req.query.email +
      ":\n\n" +
      req.query.message
  };

  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      res.status(400).send("email not sent");
    } else {
      res.status(200).send("email sent");
    }
  });
}
