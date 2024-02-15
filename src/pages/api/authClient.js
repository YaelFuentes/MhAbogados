import { databaseServiceClient } from "@/core/connection/databaseService";
import { authServiceFactory } from '@/core/connection/authService'
import withSession from "@/lib/session";

const dbService = databaseServiceClient();
const authService = authServiceFactory();

export default withSession(async (req, res) => {
  const ERROR_CREDENTIALS = 'Usuario y/o apellido incorrectos'

  const method = req.method.toLowerCase();
  const { username, password } = req.body;
  if (method !== 'post') {
    return res.status(405).end(`Method ${req.metod} Not allowed`)
  }
  try {
    const userCredentials = await dbService.getClient(username)
    if (await authService.validate(password, userCredentials.password) === true) {
      const status = 1
      await saveSession(userCredentials.name, status, {username}, req);
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
  request.session.set('DNI', dni)
  await request.session.save();
}