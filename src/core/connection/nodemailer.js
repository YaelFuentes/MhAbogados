const nodemailer = require('nodemailer')
require('dotenv').config();

const transport = () => {
  const transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_FROM,
      pass: process.env.APP_PASS
    }
  })
  return { transporter}
}

module.exports = {transport};