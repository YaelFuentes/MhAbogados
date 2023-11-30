import { WhatsappService } from "../services";

class WhatsappController {
  
  static whatsappService = new WhatsappService();

  static async enviarMensajeUsuario(id, mensajeUsuario) {
    return await this.whatsappService.EnviarMensaje(id, mensajeUsuario)
  }
}

export default WhatsappController;