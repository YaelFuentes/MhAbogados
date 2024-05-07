const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
  service: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_FROM,
    pass: process.env.APP_PASS
  }
})

module.exports = transporter;