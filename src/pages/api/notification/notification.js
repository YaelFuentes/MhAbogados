import { NotificationController } from '@/core/controller'

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      const { action } = req.query;
      switch (action) {
        case 'create':
          const fieldsUpdate = req.body;
          const client = await NotificationController.getNotificationById(fieldsUpdate);
          res.status(201).json(client)
          break;
        case 'update':
          const dataUpdate = req.body;
          const forgot = await NotificationController.forgotPassword(dataUpdate);
          res.status(201).json(forgot)
          break;
      }
    default:
      res.status(405).end(); 
      break;
  }
}