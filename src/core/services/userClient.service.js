import { db } from "../connection/databaseService";
import { authServiceFactory } from '@/core/connection/authService'

const authService = authServiceFactory();

class UserClientService {
  constructor(id, name, lastname, email, dni, password) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.dni = dni;
    this.password = password;
  }
  async getById(id) {
    try {

      let TABLECLIENT = 'userclient'
      let TABLE = 'cliente'
      const clientData = await db(TABLE).where('id', id).first();

      const userClient = await db(TABLECLIENT).where('dni', clientData.dni).first();

      return userClient ? userClient : clientData
    } catch (e) {
      console.error("Error fetching userClient by ID:", e);
      return null;
    }
  }
  async getAll() {
    try {
      let TABLE = 'userclient'
      const userClient = await db(TABLE)
      return userClient
    } catch (e) {
      console.error("Error fetching all userClient:", e);
      return [];
    }
  }
  async create(newData) {
    try {
      let TABLE = 'userclient'
      if (newData.password) {
        newData.password = await authService.hashPassword(newData.password);
      }

      const newClientId = await db(TABLE).insert(newData);
      return newClientId;
    } catch (e) {
      console.error('Error creating a new userClient:', e);
      return null;
    }
  }
  async updateByIds(ids, updates) {
    try {
      let TABLE = 'userclient'
      const updateArray = Array.isArray(updates) ? updates : [updates];
      const promises = updateArray.map(async (update) => {
        const keys = Object.keys(update);
        const values = Object.values(update);

        const updateObject = keys.reduce((acc, key, index) => {
          return { ...acc, [key]: values[index] };
        }, {});

        if ('password' in update) {
          const newPassword = await authService.hashPassword(updates.password)
          const password = {
            password: newPassword
          }
          await db(TABLE).where("id", ids).update(password);
        } else {
          await db(TABLE).where("id", ids).update(updateObject);
        }
      });

      await Promise.all(promises);
      return true;
    } catch (e) {
      console.error("Error updating client by IDs:", e);
      return false;
    }
  }
  async deleteByIds(ids) {
    try {
      let TABLE = 'userclient'
      await db(TABLE).whereIn("id", ids).del();
      return true;
    } catch (e) {
      console.error("Error deleting client by ID:", e);
      return false;
    }
  }
}
export default UserClientService;