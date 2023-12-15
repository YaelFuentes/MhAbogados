const nodemailer = require('nodemailer')

class NotificationService {
  constructor(id, user, password) {
    this.id = id;
    this.user = user;
    this.password = password;
  }

  async notificationMail(mailOptions) {
    // Asignar una constante con los valores de to:'', subjetct:'', html:''
    /* Ejemplo de html para envio de correo : 
      <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <table class="u-full-width">
        <thead>
          <tr>
            <th>Fecha Emision</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10/06/2005</td>
          </tr>
        </tbody>
      </table>
    </body>
    */
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: true,
        auth: {
          user: process.env.MAIL_FROM,
          pass: process.env.APP_PASS
        }
      })
      const from = process.env.MAIL_FROM;
      console.log(mailOptions);
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
        <p><strong>Nro Expediente:</strong> ${mailOptions.formData.idexp}</p>
        <p><strong>Decreto:</strong>${mailOptions.infoExp.decretos}</p>
        <p><strong>Fecha:</strong> ${mailOptions.formData.fecha}</p>
        <p><strong>Movimiento Realizado:</strong> ${mailOptions.formData.tipomov}</p>
      </body>
        `
      }
      /* const infoDataMail = { from, ...mailOptions } */
      /* const info = await transporter.sendMail(mailDataInfo) */
      /* console.log(info) */
    } catch (e) {
      console.log('Error al notificar al cliente: ', e)
    }
  }
}

export default NotificationService;