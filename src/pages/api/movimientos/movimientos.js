import { MovimientoController } from "@/core/controller";

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id || req.query.dni) {
        const id = parseInt(req.query.id);
        const dni = parseInt(req.query.dni)
        console.log('req.query: ',req.query)
        const response = await MovimientoController.getDataById(id, dni);
        res.json(response);
      } else {
        /* const response = await MovimientoController.getAllData();
        res.json(response); */
      }
      break;
    case 'POST':
      const fieldsUpdate = req.body;
      const response = await MovimientoController.createData(fieldsUpdate);
      res.status(201).json(response)
      break;
    case 'PUT':
      const id = parseInt(req.query.id);
      const fieldsToUpdate = req.body;
      await MovimientoController.updateDataByIds(id, fieldsToUpdate);
      res.json({ success: true });
      break;
    case 'DELETE':
      const ids = parseInt(req.query.id);
      await MovimientoController.deleteDataByIds(ids);
      res.json({ success: true });
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}