import { enviarMensaje } from "../connection/whatsapp-web";

class WhatsappService {
  constructor() { }
  async EnviarMensaje(idCliente, mensaje) {
    console.log('idCliente: ',idCliente, 'mensaje: ', mensaje)
    try {
      const numeroTelefono = await this.obtenerNumeroTelefonoPorIdCliente(idCliente);
      console.log('numero telefono: ', numeroTelefono);
      await enviarMensaje(numeroTelefono, mensaje.mensaje);

      console.log('Mensaje de WhatsApp enviado con éxito');
      return true;
    } catch (e) {
      console.error('Error al enviar el mensaje de WhatsApp:', e);
      return false;
    }
  }
  async obtenerNumeroTelefonoPorIdCliente(idCliente) {
    // Lógica para obtener el número de teléfono del cliente según el ID
    // Puedes consultar la base de datos u otra fuente de datos
    // y devolver el número de teléfono correspondiente.
    // Por ahora, devolvemos un número de ejemplo.
    return '5492612084810';
  }
}

export default WhatsappService;