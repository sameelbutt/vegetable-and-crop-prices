// require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'keith65609@gmail.com',
    pass: 'wskxvnlzrgnisyst'
  },
   
});

const sendEmail = async (options) => {
  const mailOptions = {
    from: 'keith65609@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
