import { ExpedienteController } from "@/core/controller/index";

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        const fileId = parseInt(req.query.id);
        const file = await ExpedienteController.getFileById(fileId);
        res.json(file);
      } else {
        const files = await ExpedienteController.getAllFiles();
        res.json(files);
      }
      break;
    case 'POST':
      const fieldsUpdate = req.body;
      const file = await ExpedienteController.createFile(fieldsUpdate);
      res.status(201).json(file)
      break;
    case 'PUT':
      const fileId = parseInt(req.query.id);
      const fieldsToUpdate = req.body;
      await ExpedienteController.updateFilesById(fileId, fieldsToUpdate);
      res.json({ success: true });
      break;
    case 'DELETE':
      const filesIds = parseInt(req.query.id);
      await ExpedienteController.deleteFileById(filesIds);
      res.json({ success: true });
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}