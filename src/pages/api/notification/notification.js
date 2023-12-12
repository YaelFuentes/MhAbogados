import { clientNotificationController } from "@/core/controller";

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      /* if (req.query.id) {
        const clientId = parseInt(req.query.id);
        const client = await clientNotificationController.getClientById(clientId);
        res.json(client);
      } else {
        const clients = await clientNotificationController.getAllClients();
        res.json(clients);
      }*/
      break;
    case 'POST':
      const fieldsUpdate = req.body;
      const client = await clientNotificationController.getClientById();
      res.status(201).json(client)
      break;
    case 'PUT':
      /* const clientId = parseInt(req.query.id);
      const fieldsToUpdate = req.body;
      await clientNotificationController.updateClientById(clientId, fieldsToUpdate);
      res.json({ success: true });*/
      break;
    case 'DELETE':
      /* const clientIds = parseInt(req.query.id);
      await clientNotificationController.deleteClientById(clientIds);
      res.json({ success: true }); */
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}