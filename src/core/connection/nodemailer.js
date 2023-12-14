const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: true,
  auth: {
    user: process.env.MAIL_FROM,
    pass: process.env.APP_PASS
  }
})

module.exports = transporter;