
import { ExpClienteController } from "@/core/controller";

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        const clientId = parseInt(req.query.id);
        const client = await ExpClienteController.getDataById(clientId);
        res.json(client);
      } else {
        const clients = await ExpClienteController.getAllData();
        res.json(clients);
      }
      break;
    case 'POST':
      const fieldsUpdate = req.body;
      const client = await ExpClienteController.createData(fieldsUpdate);
      res.status(201).json(client)
      break;
    case 'PUT':
      const clientId = parseInt(req.query.id);
      const fieldsToUpdate = req.body;
      await ExpClienteController.updateDataById(clientId, fieldsToUpdate);
      res.json({ success: true });
      break;
    case 'DELETE':
      const clientIds = parseInt(req.query.id);
      await ExpClienteController.deleteDataById(clientIds);
      res.json({ success: true });
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}