const nodemailer = require('nodemailer')
import { Resend } from 'resend';
import { db } from '@/core/connection/databaseService'
import { generateToken } from '@/lib/generateToken';
const dotenv = require('dotenv');
dotenv.config();

class NotificationService {
  constructor(id, user, password) {
    this.id = id;
    this.user = user;
    this.password = password;
  }

  async notificationMail(mailOptions) {
    try {
      if (/@/.test(mailOptions.infoClient.email)) {
        const transporter = nodemailer.createTransport({
          service: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.MAIL_FROM,
            pass: process.env.APP_PASS
          }
        });
        const from = process.env.MAIL_FROM;
        const mailDataInfo = {
          from: from,
          to: mailOptions.infoClient.email,
          subject: `Movimientos en su expediente Nro. ${mailOptions.formData.idexp}`,
          html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
          <h2>Detalles del Movimiento</h2>
          <p><strong>Nombre y Apellido:</strong> ${mailOptions.infoClient.nombre} ${mailOptions.infoClient.apellido}</p>
          <p><strong>Auto:</strong> ${mailOptions.infoExp.caratula}</p>
          <p><strong>Nro Expediente:</strong> ${mailOptions.formData.idexp}</p>
          <p><strong>Decreto:</strong>${mailOptions.infoExp.decretos}</p>
          <p><strong>Fecha:</strong> ${mailOptions.formData.fecha}</p>
          <p><strong>Movimiento Realizado:</strong> ${mailOptions.formData.tipomov}</p>
        </body>
        </html>`,
          replyTo: 'noreply@miempresa.com'
        };

        const infoDataMail = { from, ...mailOptions };
        const info = await transporter.sendMail(mailDataInfo)
      } else {
        throw new Error('La dirección de correo electrónico no es válida');
      }
    } catch (e) {
      console.log('Error al notificar al cliente: ', e)
    }
  }

  async recordatorioMail(mailOptions) {
    try {
      function formatearFechaHora(fechaString) {
        const fecha = new Date(fechaString);
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1;
        const año = fecha.getFullYear();
        const hora = fecha.getHours();
        const minuto = fecha.getMinutes();

        const diaFormateado = dia < 10 ? `0${dia}` : dia;
        const mesFormateado = mes < 10 ? `0${mes}` : mes;
        const horaFormateada = hora < 10 ? `0${hora}` : hora;
        const minutoFormateado = minuto < 10 ? `0${minuto}` : minuto;

        const fechaFormateada = `${diaFormateado}/${mesFormateado}/${año} ${horaFormateada}:${minutoFormateado}`;
        return fechaFormateada;
      }
      /* const transporter = nodemailer.createTransport({
        service: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL_FROM,
          pass: process.env.APP_PASS
        }
      }); */

      const from = process.env.MAIL_FROM;
      const mailDataInfo = {
        from: from,
        to: mailOptions.user,
        subject: `Notificacion MH Abogados`,
        html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <h2>Tiene un recordatorio pendiente, a finalizar ${formatearFechaHora(mailOptions.endDate)} Hrs</h2>
        <p><strong>Recordatorio: ${mailOptions.content}</strong> </p>
      </body>
      </html>`,
        replyTo: 'noreply@miempresa.com'
      };
      const info = await transporter.sendMail(mailDataInfo)
      if (info.messageId) {
        await db('eventos')
          .where('ideventos', '=', mailOptions.ideventos) // Ajusta la condición según tu esquema
          .update({ isSend: 1 });
      } else {
        console.error('Error al enviar el correo');
      }
    } catch (e) {
      console.log('error')
    }
  }


  async forgotPassword(dni) {
    try {
      const client = await db('userclient').where('dni', dni.dni).first()
      if (!client) {
        throw new Error('Cliente no encontrado');
      }
      const resetToken = generateToken()
      const resend = new Resend(process.env.RESEND_KEY);
      await db('userclient').insert({
        email: client.email,
        token: resetToken,
        expires_at: new Date(Date.now() + 3600000), // Expira en 1 hora
      });
      const resetLink = `${process.env.URL}/reset-password?token=${resetToken}&id=${client.id}`;
      
      console.log(process.env.RESEND_KEY, ' resend key')
      resend.emails.send({
        from: 'onboarding@resend.dev',
        to: client.email,
        subject:`Notificacion MH Abogados`,
        html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
        <h2>Restableceer contraseña</h2>
        <p>Por favor para restablecer su contraseña haga<strong>click</strong>
          en el siguiente enlace. 
          <a href="${resetLink}">${resetLink}</a>
        </p>
      </body>
      </html>`,
        replyTo: 'noreply@miempresa.com'
      });
      
    } catch (e) {
      console.error('Error al restablecer la contraseña E:', e)
    }
  }
}

export default NotificationService;