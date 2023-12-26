import { NotificationController } from '@/core/controller'

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      const fieldsUpdate = req.body;
      const client = await NotificationController.getNotificationById(fieldsUpdate);
      res.status(201).json(client)
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}