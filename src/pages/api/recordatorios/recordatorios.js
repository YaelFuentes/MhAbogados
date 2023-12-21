import { RecordatorioController } from '@/core/controller'

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {

      } else {
        const record = await RecordatorioController.getAll()
        res.json(record)
      }
      break;
    case 'POST':
      const fieldsUpdate = req.body
      const records = await RecordatorioController.getRecordById(fieldsUpdate)
      res.status(201).json(records)
      break;
    default:
      res.status(405).end(); // Method Not Allowed
      break;
  }
}