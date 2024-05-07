import { Resend } from 'resend';


const reseend = new Resend(`${process.env.RESEND_KEY}`)

resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'yaelfuentes32@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});