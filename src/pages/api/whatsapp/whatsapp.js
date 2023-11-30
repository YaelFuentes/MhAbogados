import { WhastappController } from "@/core/controller";

export default async function handler(req, res) {
  try {
    const clientId = parseInt(req.query.id)
    const fieldMessage = req.body
    const response = await WhastappController.enviarMensajeUsuario(clientId, fieldMessage)
    res.json(response)
  } catch (e) {
    console.error('Error en la función de API de WhatsApp:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}