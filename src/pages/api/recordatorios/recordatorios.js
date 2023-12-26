import { RecordatorioController } from '@/core/controller'
import schedule from 'node-schedule';

const getEventListeners = async () => {

}

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

schedule.scheduleJob('0 * * * *', async function () {
  try {
    const events = await getEventListeners();
    await enviarNotificaciones(events);
    console.log('Notificaciones enviadas exitosamente.');
  } catch (e) {
    console.error('Error al enviar las notificaciones: ', e)
  }
})