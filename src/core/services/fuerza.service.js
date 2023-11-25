import { db } from "../connection/databaseService";

class FuerzaService {
  constructor(idfuerza, tipofuerza) {
    this.idfuerza = idfuerza;
    this.tipofuerza = tipofuerza;
  }

  async getById() {
    try {
      const table = 'fuerza'
      const result = await db(`${table}`).where('idfuerza', id).first()
      return result
    } catch (e) {
      console.error(`Error al traer los datos de ${table}`, e);
      return null;
    }
  }
  async getAll() {
    try {
      const result = await db('fuerza')
      return result
    } catch (e) {
      console.error("Error al traer los datos de fuerza :", e);
      return [];
    }
  }
  async create(newData) {
    try {
      const table = 'fuerza'
      const newResult = await db(`${table}`).insert(newData)
      return newResult
    } catch (e) {
      console.error(`Error al insertar los datos en ${table} : `, e);
      return null;
    }
  }
  async updateByIds(ids, updates) {
    try {
      const table = 'fuerza'
      const updateArray = Array.isArray(updates) ? updates : [updates];

      const promises = updateArray.map(async (update) => {
        const keys = Object.keys(update);
        const values = Object.values(update);

        const updateObject = keys.reduce((acc, key, index) => {
          return { ...acc, [key]: values[index] };
        }, {});

        await db(`${table}`).where("idfuerza", ids).update(updateObject);
      });

      await Promise.all(promises);
      return true;
    } catch (e) {
      console.error(`Error al modificar los datos de ${table}`, e);
      return false;
    }
  }
  async deleteByIds(ids) {
    try {
      const table = 'fuerza'
      await db(`${table}`).whereIn('idfuerza', ids).del()
      return true
    } catch (e) {
      console.error(`Error al borrar los datos con id ${ids} de la tabla ${table}`, error);
      return false;
    }
  }
}
export default FuerzaService;