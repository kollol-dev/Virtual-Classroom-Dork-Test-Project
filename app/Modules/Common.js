// Global Variables & Imports
const Env = use("Env");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(Env.get("SENDGRID_API_KEY"));

const pagination = 15;

const generateRandomString = (length) => {
  charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

const sendEmail = (to, subject, emailBody) => {
  const message = {
    to: to,
    from: "dazzling.cloudlet@gmail.com", // Use the email address or domain you verified above
    subject: subject,
    text: " ",
    html: emailBody,
  };
  sgMail.send(message).then(
    () => {},
    (error) => {
      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};

module.exports = { pagination, generateRandomString, sendEmail };
