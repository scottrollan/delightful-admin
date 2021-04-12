const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

require('dotenv').config();

admin.initializeApp(functions.config().firebase);

const mailUser = process.env.REACT_APP_NOTIFICATION_EMAIL;
const mailPass = process.env.REACT_APP_NOTIFICATION_PASSWORD;
const ddEmail = process.env.REACT_APP_DELIGHTFUL_EMAIL;

exports.sendTranscripts = functions.https.onCall((data, context) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: mailUser,
      pass: mailPass,
    },
  });

  const mailOptions = {
    from: process.env.REACT_APP_NOTIFICATION_EMAIL,
    to: 'barry.rollan@gmail.com',
    // to: ddEmail,
    subject: 'Help Chat Transcript',
    html: `To: ${ddEmail} ${data}`,
  };
  // return mailOptions;

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      return info;
    }
  });
});
