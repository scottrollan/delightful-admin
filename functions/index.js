const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

require('dotenv').config();

const mailUser = process.env.REACT_APP_NOTIFICATION_EMAIL;
const mailPass = process.env.REACT_APP_NOTIFICATION_PASSWORD;
const ddEmail = process.env.REACT_APP_DELIGHTFUL_EMAIL;

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: mailUser,
    pass: mailPass,
  },
});

exports.sendTranscripts = functions.https.onCall((data, context) => {
  const mailOptions = {
    from: mailUser,
    to: 'barry.rollan@gmail.com',
    subject: 'Help Chat Transcript',
    text: `${data} and ${ddEmail}`,
  };
  // return mailOptions;

  try {
    return transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return err;
      }
      return info.response;
    });
  } catch (error) {
    return error;
  }
});
