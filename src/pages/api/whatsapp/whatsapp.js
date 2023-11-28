import { initializeWhatsAppClient } from '@/core/services/whatsapp.service';

const whatsappClient = initializeWhatsAppClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { destinatario, mensaje } = req.body;
    try {
      const chat = await initializeWhatsAppClient(destinatario);
      await chat.sendMessage(mensaje);
      res.status(201).json({ success: true, message: 'Mensaje enviado con éxito' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false, error: 'Error al enviar la notificación por WhatsApp' });
    }
  } else {
    res.status(405).end(); // Método no permitido
  }
}
