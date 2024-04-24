import { ExpedienteController } from "@/core/controller/index";

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      /* case 'GET':
      if (req.query.id || req.query.dni || req.query.mov) {
        const id = parseInt(req.query.id);
        const dni = parseInt(req.query.dni);
        const mov = parseInt(req.query.mov);
        const info = {mov, dni, id}
        const response = await MovimientoController.getDataById(info);
        res.json(response);
      } else {
        /* const response = await MovimientoController.getAllData();
        res.json(response);
      }
      break; */
      if (req.query.id || req.query.dni) {
        const dni = parseInt(req.query.dni)
        const id = parseInt(req.query.id);
        const info={id, dni}
        const response = await ExpedienteController.getFileById(info);
        res.json(response);
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
      const filesIdexp = req.query.idexp
      await ExpedienteController.deleteFileById(filesIds, filesIdexp);
      res.json({ success: true });
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}