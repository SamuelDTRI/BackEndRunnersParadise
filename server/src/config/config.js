const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "sariditri31@gmail.com",
    pass: "xkli ntae gvjf uxcd",
  },
});

transporter.verify().then(() => {
  console.log("Ready for send Emails");
});
