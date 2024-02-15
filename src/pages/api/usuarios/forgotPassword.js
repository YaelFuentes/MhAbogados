

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      try {
        const fieldsUpdate = req.body;
        const client = await ClientController.createClient(fieldsUpdate);
        res.status(201).json(client);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.status(405).end(); // Método no permitido
      break;
  }
}