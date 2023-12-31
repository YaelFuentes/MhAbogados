import { db } from "../connection/databaseService";

class ExpedienteService {
  constructor(idexp, caratula, juzgasecret, avisodeuda, observaciones, honoinicial, honocamara, honocortsupr,
    honoretromcaut, honofinal, decretos, camara, fechacautelar, idfuerza, fechasentencia, sentencia) {
    this.idexp = idexp;
    this.caratula = caratula;
    this.juzgasecret = juzgasecret;
    this.avisodeuda = avisodeuda;
    this.observaciones = observaciones;
    this.honoinicial = honoinicial;
    this.honocamara = honocamara;
    this.honocortsupr = honocortsupr;
    this.honoretromcaut = honoretromcaut;
    this.honofinal = honofinal;
    this.decretos = decretos;
    this.camara = camara;
    this.fechacautelar = fechacautelar;
    this.idfuerza = idfuerza;
    this.fechasentencia = fechasentencia;
    this.sentencia = sentencia;
  }
  async getById(id) {
    try {
      const file = await db('expediente').where('id', id).first()
      return file;
    } catch (e) {
      console.error("Error fetching user by ID:", e);
      return null;
    }
  }
  async getAll() {
    try {
      const files = await db('expediente');
      return files;
    } catch (e) {
      console.error("Error fetching all users:", e);
      return [];
    }
  }
  async create(newFileData) {
    try {
      const newFileId = await db('expediente').insert(newFileData)
      return newFileId;
    } catch (e) {
      console.error('Error creating a new user:', e);
      return null;
    }
  }
  async updateByIds(ids, updates) {
    try {
      const updateArray = Array.isArray(updates) ? updates : [updates];

      const promises = updateArray.map(async (update) => {
        const keys = Object.keys(update);
        const values = Object.values(update);

        const updateObject = keys.reduce((acc, key, index) => {
          return { ...acc, [key]: values[index] };
        }, {});

        await db("expediente").where("id", ids).update(updateObject);
      });

      await Promise.all(promises);
      return true;
    } catch (e) {
      console.error("Error updating user by IDs:", e);
      return false;
    }
  }
  async deleteByIds(ids) {
    try {
      await db("expediente").whereIn("id", ids).del();
      return true;
    } catch (e) {
      console.error("Error deleting user by ID:", error);
      return false;
    }
  }
}

export default ExpedienteService;