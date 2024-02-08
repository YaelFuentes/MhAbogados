import { databaseServiceClient } from "@/core/connection/databaseService";
import withSession from "@/lib/session";

const dbService = databaseServiceClient()

export default withSession(async (req, res) => {
  const ERROR_CREDENTIALS = 'Usuario y/o apellido incorrectos'

  const method = req.method.toLowerCase();
  const { username, password } = req.body;

  if (method !== 'post') {
    return res.status(405).end(`Method ${req.metod} Not allowed`)
  }
  try {
    const userCredentials = await dbService.getClient(username, password)
    if (password == userCredentials[0].dni) {
      const status = 1
      await saveSession({ username }, status, { password }, req);
      res.status(200).json({ username }, status);
      return;
    }
  } catch (e) {
    console.log(e)
  }
  res.status(403).json({ error: ERROR_CREDENTIALS });
})

async function saveSession(user, status, dni, request) {
  request.session.set("user", user);
  request.session.set("status", status);
  request.session.set("DNI", dni)
  await request.session.save();
}