// whatsappUtils.js
import { toast } from 'react-hot-toast';
import axios from 'axios';

export async function enviarNotificacionWhatsApp(destinatario, mensaje) {
  try {
    await axios.post('/api/whatsapp/whatsapp', { destinatario, mensaje });
    toast.success('Mensaje enviado correctamente por WhatsApp');
  } catch (error) {
    toast.error('Error al enviar la notificación por WhatsApp, inténtelo de nuevo más tarde.');
    console.error('Error al enviar el mensaje:', error);
  }
}
