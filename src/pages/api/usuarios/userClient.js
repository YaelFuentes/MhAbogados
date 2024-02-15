import { UserClientController } from "@/core/controller";

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        const userId = parseInt(req.query.id);
        const user = await UserClientController.getUserClientById(userId);
        res.json(user);
      } else {
        const users = await UserClientController.getAllUserClient();
        res.json(users);
      }
      break;
    case 'POST':
      const fieldsUpdate = req.body;
      const user = await UserClientController.createUserClient(fieldsUpdate);
      res.status(201).json(user)
      break;
    case 'PUT':
      const userId = parseInt(req.query.id);
      const fieldsToUpdate = req.body;
      await UserClientController.updateUserClientById(userId, fieldsToUpdate);
      res.json({ success: true });
      break;
    case 'DELETE':
      const userIds = parseInt(req.query.id);
      await UserClientController.deleteUserClientById(userIds);
      res.json({ success: true });
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}

