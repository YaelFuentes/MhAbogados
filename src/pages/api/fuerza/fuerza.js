import { FuerzaController } from '@/core/controller/index'

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        const fuerzaId = parseInt(req.query.id);
        const fuerza = await FuerzaController.getDataById(fuerzaId);
        res.json(fuerza);
      } else {
        const fuerza = await FuerzaController.getAllData();
        res.json(fuerza);
      }
      break;
    case 'POST':
      const fieldsUpdate = req.body;
      const fuerza = await FuerzaController.createData(fieldsUpdate);
      res.status(201).json(fuerza)
      break;
    case 'PUT':
      const fuerzaId = parseInt(req.query.id);
      const fieldsToUpdate = req.body;
      await FuerzaController.updateDataByIds(fuerzaId, fieldsToUpdate);
      res.json({ success: true });
      break;
    case 'DELETE':
      const fuerzaIds = parseInt(req.query.id);
      await FuerzaController.deleteDataByIds(fuerzaIds);
      res.json({ success: true });
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}